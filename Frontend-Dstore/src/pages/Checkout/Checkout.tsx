import { useForm, Controller } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store"
import { useCheckout } from "@/hooks/checkout/useCheckout"
import { priceFormat } from "@/helpers/formatHelper"
import { getImageUrl } from "@/lib/common"
import { toast } from "sonner"

import { ShoppingCart, CreditCard, User, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CreateOrderRequest } from "@/types/order"


export default function CheckoutForm() {
  const cart = useSelector((state: RootState) => state.cart)
  const { mutateAsync: checkout, isLoading } = useCheckout()
  const shippingFee = 50000
  const totalAmount = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalWithShipping = totalAmount + shippingFee

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateOrderRequest>()

  const onSubmit = async (data: CreateOrderRequest) => {
    if (cart.products.length === 0) {
      toast.error("Giỏ hàng trống!")
      return
    }

    const orderData = {
      total: totalWithShipping,
      payment_method: data.payment_method,
      note: data.note,
      items: cart.products.map(item => ({
        id: item.product_id,
        quantity: item.quantity,
        price: Number(item.price)
      })),
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      shipping_address: data.shipping_address
    }

    try {
      const res = await checkout(orderData);
      if (res.redirect_url) {
        window.location.href = res.redirect_url;
      } else if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Đơn hàng của bạn
          </CardTitle>
          <CardDescription>Kiểm tra lại thông tin đơn hàng trước khi thanh toán</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cart.products.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img
                src={getImageUrl(item.image) || "/placeholder.svg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-xs font-medium">{item.title}</h3>
                <div className="flex gap-2 text-xs text-gray-500">
                  <p>Số lượng: {item.quantity}</p>
                  <p>Màu sắc: {item.color}</p>
                </div>
              </div>
              <div className="text-right font-medium">
                {priceFormat(item.price)}
              </div>
            </div>
          ))}

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span>{priceFormat(totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span>{priceFormat(shippingFee)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-red-600">{priceFormat(totalWithShipping)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Thông tin khách hàng
          </CardTitle>
          <CardDescription>Nhập thông tin để hoàn tất đơn hàng</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên *</Label>
              <Input
                id="name"
                placeholder="Nguyễn Văn A"
                {...register("customer_name", { required: "Bắt buộc" })}
              />
              {errors.customer_name && <p className="text-sm text-red-500">{errors.customer_name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                placeholder="0123456789"
                {...register("customer_phone", { required: "Bắt buộc" })}
              />
              {errors.customer_phone && <p className="text-sm text-red-500">{errors.customer_phone.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register("customer_email", { required: "Bắt buộc" })}
            />
            {errors.customer_email && <p className="text-sm text-red-500">{errors.customer_email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              <MapPin className="h-4 w-4 inline mr-1" />
              Địa chỉ giao hàng *
            </Label>
            <Textarea
              id="address"
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
              {...register("shipping_address", { required: "Bắt buộc" })}
              rows={3}
            />
            {errors.shipping_address && <p className="text-sm text-red-500">{errors.shipping_address.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_method">
              <CreditCard className="h-4 w-4 inline mr-1" />
              Phương thức thanh toán *
            </Label>
            <Controller
              control={control}
              name="payment_method"
              rules={{ required: "Vui lòng chọn phương thức thanh toán" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phương thức thanh toán" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vnpay">
                      <div className="flex items-center gap-2">
                        <img src="https://play-lh.googleusercontent.com/htxII9LeOz8fRkdW0pcvOb88aoc448v9eoxnbKEPK98NLG6iX5mSd4dbu3PX9j36dwy9" alt="VNPay" className="h-5 rounded-xl" />
                        VNPay
                      </div>
                    </SelectItem>
                    <SelectItem value="momo">
                      <div className="flex items-center gap-2">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnV4cUM7jBauINof35Yn_unOz976Iz5okV8A&s" alt="MoMo" className="h-5 w-5 rounded-xl" />
                        MoMo
                      </div>
                    </SelectItem>
                    <SelectItem value="cod">Thanh toán khi nhận hàng (COD)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.payment_method && <p className="text-sm text-red-500">{errors.payment_method.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Ghi chú đơn hàng (không bắt buộc)</Label>
            <Textarea id="note" placeholder="Ghi chú thêm nếu có..." {...register("note")} />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : `Thanh toán ${priceFormat(totalWithShipping)}`}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Bằng cách đặt hàng, bạn đồng ý với{" "}
            <a href="#" className="text-blue-600 hover:underline">Điều khoản dịch vụ</a> và{" "}
            <a href="#" className="text-blue-600 hover:underline">Chính sách bảo mật</a> của chúng tôi.
          </p>
        </CardContent>
      </Card>
    </form>
  )
}
