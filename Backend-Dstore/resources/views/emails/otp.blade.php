<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mã OTP xác thực</title>
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

        body {
            font-family: 'Roboto', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
            color: #333333;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .email-header {
            padding: 24px;
            text-align: center;
            background-color: {{ $primaryColor ?? '#0066FF' }};
        }

        .email-logo {
            max-width: 200px;
            height: auto;
        }

        .email-body {
            padding: 40px 32px;
            background-color: #ffffff;
        }

        .email-greeting {
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 24px;
            color: #333333;
        }

        .email-message {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 32px;
            color: #555555;
        }

        .otp-container {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 24px;
            text-align: center;
            margin-bottom: 32px;
            border: 1px solid #e5e7eb;
        }

        .otp-title {
            font-size: 16px;
            font-weight: 500;
            color: #555555;
            margin-bottom: 16px;
        }

        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #007bff;
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 5px;
            margin: 20px 0;
            letter-spacing: 5px;
        }

        .otp-expiry {
            font-size: 14px;
            color: #777777;
        }

        .email-instructions {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 32px;
            color: #555555;
        }

        .email-warning {
            background-color: #fff8f0;
            border-left: 4px solid {{ $accentColor ?? '#FF6600' }};
            padding: 16px;
            margin-bottom: 32px;
            color: #666666;
            font-size: 14px;
            line-height: 1.5;
        }

        .email-footer {
            padding: 24px 32px;
            text-align: center;
            background-color: #f8fafc;
            border-top: 1px solid #e5e7eb;
        }

        .social-links {
            margin-bottom: 16px;
        }

        .social-link {
            display: inline-block;
            margin: 0 8px;
        }

        .social-icon {
            width: 32px;
            height: 32px;
        }

        .footer-text {
            font-size: 13px;
            color: #888888;
            margin-bottom: 12px;
            line-height: 1.5;
        }

        .footer-address {
            font-size: 12px;
            color: #999999;
            margin-bottom: 12px;
            line-height: 1.5;
        }

        .footer-links {
            font-size: 12px;
            color: #888888;
        }

        .footer-link {
            color: {{ $primaryColor ?? '#0066FF' }};
            text-decoration: none;
            margin: 0 8px;
        }

        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                border-radius: 0;
            }
            .email-body, .email-footer {
                padding: 24px 20px !important;
            }
            .otp-code {
                font-size: 28px;
                letter-spacing: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="{{ $companyLogo ?? 'DStore' }}" alt="{{ $companyName ?? 'Your Company' }}" class="email-logo">
        </div>
        <div class="email-body">
            <div class="email-greeting">
                Xin chào {{ $userName ?? 'quý khách' }},
            </div>
            <div class="email-message">
                Cảm ơn bạn đã đăng ký tài khoản. Để hoàn tất quá trình đăng ký, vui lòng sử dụng mã OTP dưới đây:
            </div>
            <div class="otp-container">
                <div class="otp-title">Mã OTP xác thực:</div>
                <div class="otp-code">{{ $otp }}</div>
                <div class="otp-expiry">Mã này có hiệu lực trong 5 phút</div>
            </div>
            <div class="email-instructions">
                <strong>Lưu ý:</strong>
                <ul>
                    <li>Không chia sẻ mã này với bất kỳ ai</li>
                    <li>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này</li>
                </ul>
            </div>
            <div class="email-warning">
                <strong>Lưu ý an toàn:</strong> Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này hoặc liên hệ với bộ phận hỗ trợ của chúng tôi ngay lập tức, vì tài khoản của bạn có thể đang bị xâm phạm.
            </div>
        </div>
        <div class="email-footer">
            <div class="social-links">
                <a href="#" class="social-link">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" class="social-icon">
                </a>
                <a href="#" class="social-link">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" class="social-icon">
                </a>
                <a href="#" class="social-link">
                    <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="Instagram" class="social-icon">
                </a>
            </div>
            <div class="footer-text">
                Email này được gửi tự động, vui lòng không trả lời.
            </div>
            <div class="footer-address">
                {{ $companyName ?? 'Your Company' }}<br>
                {{ $companyAddress ?? '123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh, Việt Nam' }}
            </div>
            <div class="footer-links">
                <a href="{{ $companyWebsite ?? 'https://yourcompany.com' }}" class="footer-link">Website</a>
                <a href="{{ $companyWebsite ?? 'https://yourcompany.com' }}/privacy" class="footer-link">Chính sách bảo mật</a>
                <a href="{{ $companyWebsite ?? 'https://yourcompany.com' }}/terms" class="footer-link">Điều khoản sử dụng</a>
            </div>
        </div>
    </div>
</body>
</html>
