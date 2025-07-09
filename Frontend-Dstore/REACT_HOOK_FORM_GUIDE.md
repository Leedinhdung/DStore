# Hướng dẫn sử dụng React Hook Form

## 1. Cài đặt

```bash
npm install react-hook-form @hookform/resolvers yup
```

## 2. Các khái niệm cơ bản

### useForm Hook

```typescript
const {
	register, // Đăng ký input fields
	handleSubmit, // Xử lý form submission
	watch, // Theo dõi giá trị của fields
	formState: { errors }, // Trạng thái lỗi
	reset, // Reset form
	setValue, // Set giá trị cho field
	getValues, // Lấy giá trị hiện tại
} = useForm({
	resolver: yupResolver(schema), // Validation schema
	mode: "onChange", // Khi nào validate
	defaultValues: {}, // Giá trị mặc định
});
```

### Validation Modes

- `onChange`: Validate khi user thay đổi giá trị
- `onBlur`: Validate khi user rời khỏi field
- `onSubmit`: Validate chỉ khi submit
- `onTouched`: Validate khi field được touch và thay đổi
- `all`: Validate trên tất cả events

## 3. Cách sử dụng cơ bản

### Đăng ký input fields

```typescript
// Cách 1: Sử dụng spread operator
<input {...register('fieldName')} />

// Cách 2: Sử dụng ref
<input ref={register('fieldName')} />

// Cách 3: Với validation rules
<input {...register('fieldName', {
  required: 'Field này là bắt buộc',
  minLength: { value: 3, message: 'Tối thiểu 3 ký tự' }
})} />
```

### Xử lý form submission

```typescript
const onSubmit = (data: FormData) => {
	console.log("Form data:", data);
	// Gọi API hoặc xử lý logic
};

<form onSubmit={handleSubmit(onSubmit)}>{/* Form fields */}</form>;
```

### Hiển thị lỗi

```typescript
{
	errors.fieldName && (
		<p className="text-red-500">{errors.fieldName.message}</p>
	);
}
```

## 4. Validation với Yup

### Tạo validation schema

```typescript
import * as yup from "yup";

const schema = yup.object({
	email: yup
		.string()
		.required("Email không được để trống")
		.email("Email không hợp lệ"),
	password: yup
		.string()
		.required("Mật khẩu không được để trống")
		.min(8, "Mật khẩu phải có ít nhất 8 ký tự")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
		),
	confirmPassword: yup
		.string()
		.required("Vui lòng xác nhận mật khẩu")
		.oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
});
```

### Sử dụng với useForm

```typescript
import { yupResolver } from "@hookform/resolvers/yup";

const {
	register,
	handleSubmit,
	formState: { errors },
} = useForm({
	resolver: yupResolver(schema),
	mode: "onChange",
});
```

## 5. Các tính năng nâng cao

### Watch - Theo dõi giá trị

```typescript
const watchedValue = watch("fieldName");
const allValues = watch(); // Theo dõi tất cả fields

// Theo dõi nhiều fields
const [email, password] = watch(["email", "password"]);
```

### SetValue - Set giá trị programmatically

```typescript
setValue("fieldName", "new value");
setValue("fieldName", "new value", { shouldValidate: true });
```

### Reset - Reset form

```typescript
reset(); // Reset về default values
reset({ email: "", password: "" }); // Reset với giá trị mới
```

### GetValues - Lấy giá trị hiện tại

```typescript
const currentValues = getValues();
const emailValue = getValues("email");
```

## 6. Conditional Fields

```typescript
const showPassword = watch("showPassword");

{
	showPassword && <input {...register("password")} type="password" />;
}
```

## 7. Custom Validation

```typescript
<input
	{...register("username", {
		validate: (value) => {
			if (value.length < 3) {
				return "Username phải có ít nhất 3 ký tự";
			}
			return true;
		},
	})}
/>
```

## 8. Async Validation

```typescript
<input
	{...register("email", {
		validate: async (value) => {
			const response = await fetch(`/api/check-email?email=${value}`);
			const { available } = await response.json();
			return available || "Email đã được sử dụng";
		},
	})}
/>
```

## 9. Best Practices

### 1. Type Safety

```typescript
interface FormData {
	email: string;
	password: string;
}

const { register, handleSubmit } = useForm<FormData>();
```

### 2. Performance

- Sử dụng `mode: 'onChange'` cẩn thận với forms lớn
- Sử dụng `mode: 'onBlur'` cho UX tốt hơn
- Tránh re-render không cần thiết

### 3. Error Handling

```typescript
const onSubmit = async (data: FormData) => {
	try {
		await submitForm(data);
	} catch (error) {
		setError("root", {
			type: "manual",
			message: "Có lỗi xảy ra, vui lòng thử lại",
		});
	}
};
```

### 4. Accessibility

```typescript
<input
	{...register("email")}
	aria-describedby={errors.email ? "email-error" : undefined}
	aria-invalid={errors.email ? "true" : "false"}
/>;
{
	errors.email && (
		<p id="email-error" className="text-red-500">
			{errors.email.message}
		</p>
	);
}
```

## 10. So sánh với useState

### Trước (useState):

```typescript
const [formData, setFormData] = useState({ email: "", password: "" });
const [errors, setErrors] = useState({ email: "", password: "" });

const handleChange = (e) => {
	const { name, value } = e.target;
	setFormData({ ...formData, [name]: value });
	// Clear error manually
	if (errors[name]) {
		setErrors({ ...errors, [name]: "" });
	}
};

const validate = () => {
	// Manual validation logic
};
```

### Sau (react-hook-form):

```typescript
const {
	register,
	handleSubmit,
	formState: { errors },
} = useForm({
	resolver: yupResolver(schema),
	mode: "onChange",
});

// Tự động handle validation, error clearing, form state
```

## 11. Lợi ích của React Hook Form

1. **Performance**: Ít re-render hơn useState
2. **Less Code**: Ít boilerplate code
3. **Built-in Validation**: Tích hợp validation mạnh mẽ
4. **Type Safety**: Hỗ trợ TypeScript tốt
5. **Accessibility**: Tích hợp ARIA attributes
6. **Flexible**: Dễ dàng customize và extend

## 12. Debugging

```typescript
const { formState } = useForm();

console.log("Form State:", formState);
console.log("Is Dirty:", formState.isDirty);
console.log("Is Valid:", formState.isValid);
console.log("Errors:", formState.errors);
```
