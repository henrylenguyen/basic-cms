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
  "private_key_id": "09adcb606e2cb9e911d2c0c12a75e07ed983eb22",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDC6oln4M3zBq7I\nCxewWFeuHn2a7l9QxNxHw3Wy6LTSFZWLpy3L2pc5ioEAJ3rnFRqql6Jo1baQ3DDL\nZf8pgTMJ5yXmlwZRhneTWrreSB2giXSeXVWr9hz6KrIqppdQW7DQI3RrrdJxX38b\nPavMlwxFuvTGuacHw0Yrygwqs5nVIbWWy0swe1Ldsw2gP6u0CL2ve1hO26WXlg0N\n/9CcqHNUsYaoB9Gzu/9VISV+NnVkWf4OvBtcdejzgyzK/ZKzIsLFLm+utTHoBmK9\n0M+b21SeEL3sWHEu9B62P7ioBihdFu/Fa2z4A+NtmAWNg9LZKSZYlKhUzxxZw5zt\nJtfr3thdAgMBAAECggEAIgeD7z6UfjAlvhePrnIx9pxspeqleeqwoZfKme5eOUpa\n5juM94jle36GmJIL90GcOvnHuUFMgxxqKWyYgHTFxh4UpB4sVHnjMPb3ZnzVLVSq\nJ0bYwPGyK+vd2KvmgXlMlH4IIo+BjNkVDhq1fn3FfvwNpY8+jdCmFNmMx7y85/RQ\n/rGP9tkGjOZfMB5OHjS2sxevkjMCILHk7+oKmAXejRuh8EFFm8kua+k5UWMjYf3P\nuJe5F3LQkoODf8OEO63jlMRE43hFq39vJuPKAddCIoE/Wmalh64hqdLOcdR7G7sF\nk8PNyL0sAZrRFh/16XnhiYTCifjToZz3RKehPWCumQKBgQD3v0X36jTmkP2USClo\nciUTe6WIipveq6gQci64y+Lu4R2szykt7OtOEgVr4Ix2dwXfdGbvcwFuihM0XhRj\n371pWilbCGV7KHi2Aes+i7GyveMn5rQ3h9kSXLSg1Be7GDR1qDKpzmdr/BNk+Yt8\nXzh2YmmQiQnPwz4ThUT5wBfHyQKBgQDJaLvR2O1Qgcg/5JjbCzArgd+V4DzLQIan\ndlt0dFbGTgpsCBA366XYx0wjQM/lsn8zr+WnhopusQ4mbohbz3BDFzh7Xq6wcDNz\n+X0XtriurGa15XeoR7+xOex1qBc9HuPvhZ3nYTwEYL86AqjnKRcNn0s6Axrn+Pi1\n6TUbmtP99QKBgQDczSsl1iXJrEVkZ6AIB1tF7vhMJgTfQqvp5GoBpy0c66OQBZ3U\n4Yehr+wHBj0Jw/CHA+5N0HjhNMwC6ypPDPR6NbIQAP648gwLYtBvkP8Rp60RPcs2\nhquPcvJFOGHiDKOMjRiCQIPqOOJsJwALG65tzC37dDc7ZO4pZahg0rQfCQKBgGe2\nMbj+Pj2NhuM3wGpS2YwdxVc077kt0ejbrn5KBgD5YK5+fHN/OZhmD9O7ZRJ/lraz\n5csdIZ2cOJAbrMWyDLnPdDs65zNdo3Ed0IdshK8VgZI6xiH2SERnclanpsfHZ1II\neOYTkMckVnP1uKnH4+IU27TUsn8vGkr5+mnrkSwdAoGAGqFbJp9Ef/NxjPpXHDkp\ncX4eW+zUL1gG/ECpH8f2ZEo2XtKXs4gMBMzOcjswCgWXc2R6KUPwa+hzHxtzPPJp\noRvWQD61nwHVmXpBiZuFL2rBjWRYTrM5yahKFjNiyxSydRWahR5FKudu7K38uBTh\nkgwsVsK90bSMcQOKPfOx2js=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-7a7m2@cms-basic-c70f4.iam.gserviceaccount.com",
  "client_id": "110733766249082181452",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7a7m2%40cms-basic-c70f4.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

```