# DStore - E-commerce Frontend

DStore là một ứng dụng e-commerce frontend được xây dựng bằng React, TypeScript và Vite, chuyên bán thiết bị âm thanh như tai nghe và loa.

## 🚀 Tính năng

- **Trang chủ**: Hiển thị banner, flash sale, và các sản phẩm theo danh mục
- **Danh mục sản phẩm**: Tai nghe (true wireless, bluetooth, có dây), Loa (vi tính, kiểm âm, bluetooth)
- **Giỏ hàng**: Quản lý sản phẩm với tính năng tăng/giảm số lượng
- **Chi tiết sản phẩm**: Xem thông tin chi tiết sản phẩm
- **Responsive Design**: Tương thích với mọi thiết bị

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Material-UI (MUI)
- **State Management**: Redux Toolkit + Redux Persist
- **Routing**: React Router DOM
- **UI Components**: Swiper, React Icons
- **Development**: ESLint, TypeScript

## 📁 Cấu trúc dự án

```
src/
├── app/                    # Redux store configuration
├── components/             # Reusable components
│   ├── common/            # Common UI components
│   ├── sections/          # Section components
│   ├── cart/              # Cart-related components
│   └── ...
├── constants/             # Constants and data
├── features/              # Redux slices
├── helpers/               # Utility functions
├── hooks/                 # Custom hooks
├── layouts/               # Layout components
├── pages/                 # Page components
├── routes/                # Routing configuration
├── services/              # API services
├── utils/                 # Utility functions
└── types/                 # TypeScript type definitions
```

## 🚀 Cách chạy dự án

### Yêu cầu hệ thống

- Node.js >= 18
- npm hoặc yarn

### Cài đặt dependencies

```bash
npm install
```

### Chạy development server

```bash
npm run dev
```

### Build cho production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint code

```bash
npm run lint
```

## 🏗️ Kiến trúc và Best Practices

### 1. **Component Architecture**

- **Atomic Design**: Components được tổ chức theo nguyên tắc atomic design
- **Single Responsibility**: Mỗi component chỉ có một trách nhiệm duy nhất
- **Reusability**: Components có thể tái sử dụng cao

### 2. **State Management**

- **Redux Toolkit**: Quản lý state toàn cục
- **Redux Persist**: Lưu trữ state trong localStorage
- **Custom Hooks**: Tách biệt logic khỏi components

### 3. **Type Safety**

- **TypeScript**: Đảm bảo type safety toàn bộ ứng dụng
- **Interface Definitions**: Định nghĩa rõ ràng các interface
- **Type Guards**: Validation types

### 4. **Code Organization**

- **Constants**: Tất cả constants được tập trung trong `src/constants/`
- **Utils**: Utility functions được tổ chức theo chức năng
- **Hooks**: Custom hooks cho logic tái sử dụng

### 5. **Performance Optimization**

- **Memoization**: Sử dụng useMemo và useCallback
- **Lazy Loading**: Components được load khi cần
- **Code Splitting**: Tách code theo routes

## 📝 Cải thiện đã thực hiện

### ✅ **Cấu trúc code**

- Tách data hardcode ra constants
- Tạo reusable components
- Tách logic ra custom hooks
- Cải thiện component architecture

### ✅ **Type Safety**

- Định nghĩa rõ ràng interfaces
- Sử dụng TypeScript strict mode
- Validation functions

### ✅ **Performance**

- Tối ưu re-renders
- Memoization cho expensive calculations
- Lazy loading components

### ✅ **Maintainability**

- Code duplication reduction
- Consistent naming conventions
- Clear separation of concerns
- Better error handling

### ✅ **Developer Experience**

- Better file organization
- Consistent code style
- Improved readability
- Better debugging experience

## 🔧 Development Guidelines

### Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard`)
- **Files**: PascalCase cho components, camelCase cho utilities
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase

### Code Style

- Sử dụng TypeScript strict mode
- Prefer functional components với hooks
- Sử dụng destructuring cho props
- Consistent import/export patterns

### Testing

- Unit tests cho utility functions
- Component testing với React Testing Library
- Integration tests cho Redux actions

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 🤝 Contributing

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📞 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub repository.
