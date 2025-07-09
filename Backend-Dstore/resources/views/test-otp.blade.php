<!DOCTYPE html>
<html>
<head>
    <title>Test OTP</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <h1>Test Gửi OTP</h1>

    <div>
        <h2>Gửi OTP</h2>
        <input type="email" id="email" placeholder="Nhập email" required>
        <button onclick="sendOtp()">Gửi OTP</button>
    </div>

    <div style="margin-top: 20px;">
        <h2>Xác thực OTP</h2>
        <input type="email" id="verify-email" placeholder="Email">
        <input type="text" id="otp" placeholder="Nhập OTP" maxlength="6">
        <button onclick="verifyOtp()">Xác thực</button>
    </div>

    <div id="result" style="margin-top: 20px;"></div>

    <script>
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        function sendOtp() {
            const email = $('#email').val();
            if (!email) {
                alert('Vui lòng nhập email!');
                return;
            }

            $.post('/otp/send', {email: email})
                .done(function(response) {
                    $('#result').html('<p style="color: green;">' + response.message + '</p>');
                    $('#verify-email').val(email);
                })
                .fail(function(xhr) {
                    $('#result').html('<p style="color: red;">Lỗi: ' + xhr.responseJSON.message + '</p>');
                });
        }

        function verifyOtp() {
            const email = $('#verify-email').val();
            const otp = $('#otp').val();

            if (!email || !otp) {
                alert('Vui lòng nhập đầy đủ email và OTP!');
                return;
            }

            $.post('/otp/verify', {email: email, otp: otp})
                .done(function(response) {
                    $('#result').html('<p style="color: green;">' + response.message + '</p>');
                })
                .fail(function(xhr) {
                    $('#result').html('<p style="color: red;">Lỗi: ' + xhr.responseJSON.message + '</p>');
                });
        }
    </script>
</body>
</html>
