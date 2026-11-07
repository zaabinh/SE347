function KiemTraNhapLieu(){
    if(txtUser.value == "")
    {
        lblThongBao.innerHTML = "Bạn chưa nhập <b>tên người dùng</b>";
        txtUser.focus();
        return false;
    }
    if(txtPass.value=="")
    {
        lblThongBao.innerText = "Bạn chưa nhập mật khẩu";
        txtPass.focus();
        return false;
    }
    if(txtUser.value == "hoaichieu" && txtPass.value == "123456")
    {
        //lblThongBao.innerHTML = "Chào bạn <b>" + txtUser.value + "</b>";
        alert("Chào bạn " + txtUser.value);
        return true;
    }
    else
    {
        lblThongBao.innerHTML = "Thông tin đăng nhập không hợp lệ";
        txtUser.select();
        return false;
    }
}
function NhapLai()
{
    lblThongBao.innerHTML = "";
    txtUser.focus();
}