# 📝 mui-dynamic-field

> **A dynamic and customizable input field component for React, built with Material UI & TypeScript.**

## 🚀 Features

✅ **Multiple Input Types** – `text`, `password`, `number`, `dropdown`, `date`, `time`, `checkbox`, etc.  
✅ **Material UI Integration** – Uses MUI components for consistent design.  
✅ **Customizable Props** – Control size, label, placeholder, validation rules, and more.  
✅ **Validation Support** – Includes regex validation, min/max length, required fields, etc.  
✅ **TypeScript Support** – Fully typed for better DX.  
✅ **Lightweight & Performant** – Optimized for reusability and efficiency.

---

## 📦 Installation

Install via **npm** or **yarn**:

```sh
npm install mui-dynamic-field
# or
yarn add mui-dynamic-field
```

---

## 🔧 Usage Example

```tsx
import { DynamicField } from "mui-dynamic-field";

export default function Example() {
  return (
    <DynamicField
      _key="password"
      inputType="password"
      label="Enter Password"
      placeholder="Type here..."
      error={false}
      size="medium"
    />
  );
}
```

---

## 🔗 Supported Input Types

| Type           | Description                        |
| -------------- | ---------------------------------- |
| `text`         | Standard text input field          |
| `password`     | Input field with visibility toggle |
| `number`       | Numeric input field                |
| `dropdown`     | Select dropdown                    |
| `date`         | Date picker                        |
| `time`         | Time picker                        |
| `datetime`     | Date and time picker               |
| `checkbox`     | Checkbox input                     |
| `autocomplete` | Autocomplete dropdown              |

---

## 📜 License

MIT

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

## 📞 Support

For any issues or feature requests, please open an issue on [GitHub](https://github.com/yourusername/mui-dynamic-field/issues).
