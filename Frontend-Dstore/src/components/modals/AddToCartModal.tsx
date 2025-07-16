import routes from "@/routes/routes";
import {
    Modal,
    Box,
    Typography,
    Button,
    Stack,
    Grow,
    Backdrop,
} from "@mui/material"
import { CheckCircle } from "lucide-react";


export default function AddToCartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 200 } }}
        >
            <Grow in={open} timeout={400}>
                <Box
                    sx={{
                        position: "fixed",
                        top: "30%",
                        left: "40%",
                        transform: "translate(-50%, -50%)",
                        width: 360,
                        bgcolor: "background.paper",
                        borderRadius: 5,
                        boxShadow: 24,
                        p: 4,
                        outline: "none",
                    }}
                >
                    <Stack spacing={2} alignItems="center">
                        <CheckCircle size={48} color="green" />
                        <Typography variant="h6" fontWeight={600}>
                            Đã thêm vào giỏ hàng!
                        </Typography>
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                            Bạn có thể tiếp tục mua sắm hoặc kiểm tra giỏ hàng của mình.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" onClick={onClose}>
                                Tiếp tục mua
                            </Button>
                            <Button variant="contained" href={routes.cart}>
                                Xem giỏ hàng
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Grow>
        </Modal>
    )
}
