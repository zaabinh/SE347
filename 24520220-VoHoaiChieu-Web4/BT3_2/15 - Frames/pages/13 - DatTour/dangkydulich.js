function inThongBao(){
    alert("Bạn đã đăng ký thành công. Thông tin đăng ký của bạn như sau:\n======================================================\nHọ tên: 
        "+txtHoTen.value+"\nĐịa chỉ: "+txaDiaChi.value+"\nĐiện thoại: "+txtDienThoai.value+"\nLoại khách: "+(chkKhachVN.checked?"Việt Nam":
        "Nước ngoài")+"\nChọn tour: "+selChonTour.options[selChonTour.selectedIndex].text+"\nPhương tiện: "+(maybay.checked?"Máy bay"
            :(xedulich.checked?"Xe du lịch":"Tự túc"))+"\nSố lượng khách đoàn: "+ numNguoiLon.value+" người lớn - "+numTreEm.value+" trẻ em"+"\nGhi chú thêm:
             "+txaGhiChu.value+"\n======================================================");
}