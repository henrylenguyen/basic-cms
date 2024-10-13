# Dự án interview basic cms

## Hướng dẫn sử dụng:
1. clone project về thông qua lệnh ở ***terminal***

```bash

  git clone https://github.com/henrylenguyen/basic-cms.git

```
2. Chạy lệnh dưới để cài đặt các package

```bash

  npm i

```

3. Sau khi cài đặt xong ***node_modules*** tiếp tục với lệnh sau để chạy dự án

```bash

npm start

```

Lệnh này sẽ chạy ***server*** lẫn ***client*** cùng lúc

### Các lib trong dự án
0. Vitejs (webpack build dự án)
1. react-router-dom (Thư viện quản lý routing)
2. redux-toolkit (Thư viện quản lý state toàn cục)
3. tanstack table (Thư viện quản lý dữ liệu bảng)
4. react-hook-form (Thư viện quản lý form)
5. Zod (Thư viện validate)
6. Firebase (Quản lý database)
7. ExpressJS (Build backend)
8. Shadcn (Thư viện UI)
9. TailwindCSS (Styled UI)

# Cài firebase sdk

```json
{
  "type": "service_account",
  "project_id": "cms-basic-c70f4",
  "private_key_id": "ab03d7ebece309f7ee681964cbf448d4e13992e8",
  "private_key": "",
  "client_email": "firebase-adminsdk-7a7m2@ cms-basic-c70f4.iam.gserviceaccount.    com",
  "client_id": "110733766249082181452",
  "auth_uri": "https://accounts  .google.com/     o/oauth2/auth",
  "token_uri": "https://oauth2  .googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis  .com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.        com/robot/v1/metadata/x509/firebase-adminsdk-7a7m2%40cms-basic-c70f4.iam.gserviceaccount.com",
  "universe_domain": "googleapis.      com"
}


```

# Private Key

```json
 "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCl3NRngA3bHoqT\nFEPmlFoPBTCK+TdQ0g1Nbzw9Fy2Z80rhwIvT9sOHbiKsW0B5Ry9VG0quphYVms6D\n23/G23Uv9nFFtn7D8G3KahrSuJ/ZK9Ufvhb5ro8ErNcu9NtuAl5ES1NwcH8e8igP\nDm54j06+GCydybXVnZ5A4uiHMhWIBmHWhXFqmPuCitJxcP/lZpc9AYh5KPVdYdGZ\nbohEPx7w82TbMKggiS3ef1GiEJ1QWQmMhO3wUnpFPkvpriw1P3xwq1twFHCgQfbD\nQeM9gJ4DVYunjBrXPT9zfbb9rGB0NguQ3b5KoQfungMY0zFiBQ1eOnftH/txisc6\nkbJFOSOvAgMBAAECggEABSpYbxS82bscw7HY34B1QYx+04UpZNn10hiJvrlPEUFT\nbq5pbGN9+WTDrax12JEP902PSNshSvD0R4T5eL7y6lh5dJtXXVDKiog9Z5yaVdAY\nphFsc8As8g9T8EFt6AIo32WdJp5KRzNxbe6cICMOZ7snAI78m7d56zll1ngH1aGY\nZxBrRnYsBmCSA0JmNwUiBQ0n1T2EIp7VssW+CDGMrohoyt8UYhYSH0BJ6p8lp85h\n8ZcELV9xkjcZ9swLfOyAWydHeC0tzwL/Yytu4HxmMxWLLwuGjUy6PYKqrqMNdctG\n8eNkfEP9Z1HwxiP7h9Yvu1uBfNKyPwDFIzTkyhaLYQKBgQDYCbApNoZAPrywBblw\ncFNjEw8gvbjL5zTdrHXJwGOUPaiUPkn0pw/LiKGlCF1omjfL7ZJtIeUbIahDSePL\nRjJ/bYz8rklD5su2eYkb5VDZFKDiS0T98RkAb8ckd2KjnDaiVKMl1cpX0MH2uOgp\n3/MXJo/Vn14G6DlJ/MV4IMx00QKBgQDEiyGACL6CAB/ddNJXtuGniP/3TGPSpdef\nD0iqtJOPtQls/L6oSmGm55ADSGoL09oHUE75K0rCpZI/kx8B3N1qbed6y78iqo9p\niHVq6eZu0+Vrc0SHiQnWoML3NKrOrIHDpgxkEfDxrU6Njlt0ZyNzU7uWGI2EcNuR\nkFNwlKQwfwKBgDbBxd+8TSzNef/Xg5gHMGuFMilnTQaJlLG2+6fmVpcFRcxFOXOE\nQJGjEO2GgD56EDhk/98fXzWQQ1jCyrUEFtqLhteoyTMntWyLw3/JkMNk4h5ZW6RN\nzrt4mW4ZwGudtY9RioSVepLle7QwS9AJTlEI2h4YJbn0dEjXg6meDpRxAoGAF5fH\n9rGWBM71BEVwtnzKi6zjZREzbmbgAkT4aR1yFS8bKY0Raew72qgzXmGD8VWF95jJ\nUhnDSKhNbPpBH50eqxb0UYZBtGya+IUb6zCWq7kd8g8NK+PkXXJA1SHqWxLUJOM6\n24xXyvsN0epDyi5TUBW+D990pXBSux+DFKGTMAsCgYEAwEI2yFDkt9Jpp4iBdW9x\nhlIIFDcvJoJ4b/tJi9hs4IqDFIeFQZuMMVBLCMQPxcBhHP7Ig14vQgLI51PAgDBy\npTo5ihF85qAukcI8U0URRg0J10UPpsw5Lu622w8zjkAnjTo9D7vZUc81Yvy9gASB\n693hCWL26+assJFdwEOpfCs=\n-----END PRIVATE KEY-----\n"
```
