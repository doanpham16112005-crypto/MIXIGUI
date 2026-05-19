Blend data là thao tác kết hợp dữ liệu từ hai nguồn độc lập thành một tập dữ liệu duy nhất dựa trên một trường thông tin chung. Trong trường hợp này, thao tác sẽ nối số liệu từ Google Search Console với danh sách từ khóa tĩnh từ Google Sheets dựa trên điểm chung là cột chứa từ khóa.

Các thao tác thực hiện trên giao diện Looker Studio:

1. Nhấn vào nút Blend có biểu tượng hai vòng tròn giao nhau trên thanh công cụ phía trên, nằm giữa nút Add data và Add a chart.
    
2. Giao diện Blend Data sẽ xuất hiện ở phía dưới. Tại bảng dữ liệu bên trái, chọn nguồn là Search console.
    
3. Trong phần Dimensions của bảng bên trái, thêm trường Query.
    
4. Nhấn Join another table.
    
5. Tại bảng dữ liệu bên phải, chọn nguồn là Google Sheets chứa danh sách từ khóa.
    
6. Trong phần Dimensions của bảng bên phải, thêm trường chứa tên từ khóa.
    
7. Nhấn vào khu vực cấu hình liên kết nằm giữa hai bảng dữ liệu.
    
8. Chọn loại liên kết là Inner.
    
9. Trong phần Join conditions, thiết lập trường Query của bảng trái khớp với trường từ khóa của bảng phải.
10. Nhấn vào ô có chữ Configure join và biểu tượng hình cây bút chì nằm ở khoảng trống giữa hai cột bảng dữ liệu.
11. Cấu hình hiện tại chưa chính xác do trường dữ liệu bên phải đang bị thiếu.

12. Nhấn vào ô có chữ Missing màu hồng trong phần Merge conditions.
    
13. Chọn trường Từ khóa từ danh sách thả xuống.
    
14. Kiểm tra để đảm bảo liên kết hiển thị QueryTable 1 khớp với Từ khóa.
    
15. Nhấn Save để hoàn tất việc tạo nguồn dữ liệu kết hợp.