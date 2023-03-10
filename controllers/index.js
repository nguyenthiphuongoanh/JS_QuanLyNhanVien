
var mangNhanVien = [];
var kiemTra = new Validation();

// CREATE//
document.getElementById('btnThemNguoiDung').onclick = function () {

    var nv = new NhanVien();
    nv.taiKhoanNV = document.querySelector('#taiKhoanNV').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#matKhau').value;
    nv.ngayLam = document.querySelector('#ngayLam').value;
    nv.luongCB = document.querySelector('#luongCB').value;
    nv.heSoLuong = document.querySelector('#chucVu').value;
    nv.gioLam = document.querySelector('#gioLam').value;

    var tagSelect = document.getElementById('chucVu')
    var viTriTheChon = tagSelect.selectedIndex;
    var chucVu = tagSelect.options[viTriTheChon].innerHTML;
    nv.chucVu = chucVu;

    //Kiểm tra dữ liệu đầu vào 
    var valid = true;
    valid = kiemTra.kiemTraRong(nv.taiKhoanNV, 'error-required-taiKhoanNV', 'Tài khoản')
        & kiemTra.kiemTraRong(nv.tenNhanVien, 'error-required-tenNhanVien', 'Tên nhân viên')
        & kiemTra.kiemTraRong(nv.email, 'error-required-email', 'Email')
        & kiemTra.kiemTraRong(nv.matKhau, 'error-required-matKhau', 'Mật khẩu')
        & kiemTra.kiemTraRong(nv.ngayLam, 'error-required-ngayLam', 'Ngày làm')
        & kiemTra.kiemTraRong(nv.luongCB, 'error-required-luongCB', 'Lương cơ bản')
        & kiemTra.kiemTraRong(nv.gioLam, 'error-required-gioLam', 'Giờ làm');

   
    valid = valid & kiemTra.kiemTraKyTu(nv.tenNhanVien, 'error-allLetter-tenNhanVien', 'Tên nhân viên');
   
    valid = valid & kiemTra.kiemTraEmail(nv.email, 'error-email', 'Email');
   
    valid = valid & kiemTra.kiemTraMatKhau(nv.matKhau, 'error-matKhau', 'Mật khẩu');
   
    valid = valid & kiemTra.kiemTraDinhDangNgay(nv.ngayLam, 'error-date-format-ngayLam', 'Ngày làm');
   
    valid = valid & kiemTra.kiemTraDoDai(nv.taiKhoanNV, 'error-min-max-length-taiKhoanNV', 'Tài khoản', 4, 6);

    valid = valid & kiemTra.kiemTraGiaTri(nv.luongCB, 'error-min-max-length-luongCB', 'Lương cơ bản', 1000000, 20000000)
        & kiemTra.kiemTraGiaTri(nv.gioLam, 'error-min-max-length-gioLam', 'Giờ làm', 80, 200);
   
    valid = valid & kiemTra.kiemTraChucVuHopLe(nv.chucVu, 'error-valid-chucVu');


    if (!valid) {
        return;
    }

    // tính tổng lương
    var tongLuong = 0;
    tongLuong = nv.heSoLuong * nv.luongCB;
    nv.tongLuong = tongLuong;
    // xếp loại
    var xepLoai = '';
    if (nv.heSoLuong == 1 && nv.gioLam >= 192) {
        xepLoai = 'Xuất sắc'
    } else if (nv.heSoLuong == 1 && nv.gioLam >= 176) {
        xepLoai = 'Giỏi'
    } else if (nv.heSoLuong == 1 && nv.gioLam >= 160) {
        xepLoai = 'Khá'
    }
    else if (nv.heSoLuong == 1 && nv.gioLam < 160) {
        xepLoai = ' Trung bình'
    }
    nv.xepLoai = xepLoai;

    mangNhanVien.push(nv);
    console.log('mangNhanVien', mangNhanVien)

    renderTableNhanVien(mangNhanVien);
   
    luuLocalStrage();
    
}

function renderTableNhanVien(arrNhanVien) {
    var htmlString = '';
    for (var index = 0; index < arrNhanVien.length; index++) {
        var nv = arrNhanVien[index];
        htmlString += `
            <tr>
                <td>${nv.taiKhoanNV}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.xepLoai}</td>
                

                <td>
                <button class="btn btn-primary mx-2" data-toggle="modal" data-target="#myModal" onclick="layThongTin('${nv.taiKhoanNV}')">Chỉnh sửa</button>  
                <button class="btn btn-danger" onclick="xoaNhanVien('${index}')">Xóa</button>
                </td>
            </tr>
        `
    }
    document.querySelector('#tblNhanVien').innerHTML = htmlString;
    return htmlString; 
}

// EDIT//
function layThongTin(taiKhoanNVClick) {
    document.getElementById('btnThemNguoiDung').disabled = true;
 
    for (var index = 0; index < mangNhanVien.length; index++) {
        if (mangNhanVien[index].taiKhoanNV === taiKhoanNVClick) {
            document.getElementById('taiKhoanNV').value = mangNhanVien[index].taiKhoanNV;
            document.getElementById('tenNhanVien').value = mangNhanVien[index].tenNhanVien;
            document.getElementById('email').value = mangNhanVien[index].email;
            document.getElementById('matKhau').value = mangNhanVien[index].matKhau;
            document.getElementById('ngayLam').value = mangNhanVien[index].ngayLam;
            document.getElementById('luongCB').value = mangNhanVien[index].luongCB;
            document.getElementById('chucVu').value = mangNhanVien[index].heSoLuong;
            document.getElementById('gioLam').value = mangNhanVien[index].gioLam;
            break;
        }
    }
}

document.getElementById('btnCapNhat').onclick = function () {
    var nhanVienEdit = new NhanVien();
    nhanVienEdit.taiKhoanNV = document.getElementById('taiKhoanNV').value;
    nhanVienEdit.tenNhanVien = document.getElementById('tenNhanVien').value;
    nhanVienEdit.email = document.getElementById('email').value;
    nhanVienEdit.matKhau = document.getElementById('matKhau').value;
    nhanVienEdit.ngayLam = document.getElementById('ngayLam').value;
    nhanVienEdit.luongCB = document.getElementById('luongCB').value;
    nhanVienEdit.heSoLuong = document.getElementById('chucVu').value;
    nhanVienEdit.gioLam = document.getElementById('gioLam').value;

    var tagSelect = document.getElementById('chucVu')
    var viTriTheChon = tagSelect.selectedIndex;
    var chucVu = tagSelect.options[viTriTheChon].innerHTML;
    nhanVienEdit.chucVu = chucVu;

    //Kiểm tra dữ liệu đầu vào 
    var valid = true;
    valid = kiemTra.kiemTraRong(nhanVienEdit.taiKhoanNV, 'error-required-taiKhoanNV', 'Tài khoản')
        & kiemTra.kiemTraRong(nhanVienEdit.tenNhanVien, 'error-required-tenNhanVien', 'Tên nhân viên')
        & kiemTra.kiemTraRong(nhanVienEdit.email, 'error-required-email', 'Email')
        & kiemTra.kiemTraRong(nhanVienEdit.matKhau, 'error-required-matKhau', 'Mật khẩu')
        & kiemTra.kiemTraRong(nhanVienEdit.ngayLam, 'error-required-ngayLam', 'Ngày làm')
        & kiemTra.kiemTraRong(nhanVienEdit.luongCB, 'error-required-luongCB', 'Lương cơ bản')
        & kiemTra.kiemTraRong(nhanVienEdit.gioLam, 'error-required-gioLam', 'Giờ làm');

  
    valid = valid & kiemTra.kiemTraKyTu(nhanVienEdit.tenNhanVien, 'error-allLetter-tenNhanVien', 'Tên nhân viên');
 
    valid = valid & kiemTra.kiemTraEmail(nhanVienEdit.email, 'error-email', 'Email');
 
    valid = valid & kiemTra.kiemTraMatKhau(nhanVienEdit.matKhau, 'error-matKhau', 'Mật khẩu');
  
    valid = valid & kiemTra.kiemTraDinhDangNgay(nhanVienEdit.ngayLam, 'error-date-format-ngayLam', 'Ngày làm');
   
    valid = valid & kiemTra.kiemTraDoDai(nhanVienEdit.taiKhoanNV, 'error-min-max-length-taiKhoanNV', 'Tài khoản', 4, 6);

    valid = valid & kiemTra.kiemTraGiaTri(nhanVienEdit.luongCB, 'error-min-max-length-luongCB', 'Lương cơ bản', 1000000, 20000000)
        & kiemTra.kiemTraGiaTri(nhanVienEdit.gioLam, 'error-min-max-length-gioLam', 'Giờ làm', 80, 200);
   
    valid = valid & kiemTra.kiemTraChucVuHopLe(nhanVienEdit.chucVu, 'error-valid-chucVu');

    if (!valid) {
        return;
    }

    // tính tổng lương
    var tongLuong = 0;
    tongLuong = nhanVienEdit.heSoLuong * nhanVienEdit.luongCB;
    nhanVienEdit.tongLuong = tongLuong;
    // xếp loại
    var xepLoai = '';
    if (nhanVienEdit.heSoLuong == 1 && nhanVienEdit.gioLam >= 192) {
        xepLoai = 'Xuất sắc'
    } else if (nhanVienEdit.heSoLuong == 1 && nhanVienEdit.gioLam >= 176) {
        xepLoai = 'Giỏi'
    } else if (nhanVienEdit.heSoLuong == 1 && nhanVienEdit.gioLam >= 160) {
        xepLoai = 'Khá'
    }
    else if (nhanVienEdit.heSoLuong == 1 && nhanVienEdit.gioLam < 160) {
        xepLoai = ' Trung bình'
    }
    nhanVienEdit.xepLoai = xepLoai;

   
    for (var index = 0; index < mangNhanVien.length; index++) {
        if (mangNhanVien[index].taiKhoanNV === nhanVienEdit.taiKhoanNV) {
            mangNhanVien[index].tenNhanVien = nhanVienEdit.tenNhanVien;
            mangNhanVien[index].email = nhanVienEdit.email;
            mangNhanVien[index].matKhau = nhanVienEdit.matKhau;
            mangNhanVien[index].ngayLam = nhanVienEdit.ngayLam;
            mangNhanVien[index].luongCB = nhanVienEdit.luongCB;
            mangNhanVien[index].heSoLuong = nhanVienEdit.heSoLuong;
            mangNhanVien[index].chucVu = nhanVienEdit.chucVu;
            mangNhanVien[index].gioLam = nhanVienEdit.gioLam;
            mangNhanVien[index].tongLuong = nhanVienEdit.tongLuong;
            mangNhanVien[index].xepLoai = nhanVienEdit.xepLoai;
            break;
        }
    }
    renderTableNhanVien(mangNhanVien);
   
    luuLocalStrage();
    
    document.getElementById('btnThemNguoiDung').disabled = false;
}


function xoaNhanVien(indexDel) {
    mangNhanVien.splice(indexDel, 1);
    renderTableNhanVien(mangNhanVien);
    luuLocalStrage();
}


function luuLocalStrage() {
    var stringMangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.setItem('mangNhanVien', stringMangNhanVien);

}

function layStore() {

    if (localStorage.getItem('mangNhanVien')) {
        var stringMangNhanVien = localStorage.getItem('mangNhanVien');
        console.log(stringMangNhanVien);
        mangNhanVien = JSON.parse(stringMangNhanVien);

        console.log(mangNhanVien);
        renderTableNhanVien(mangNhanVien);
    }

}
layStore();


document.getElementById('txtTuKhoa').oninput = function () {
    var tuKhoa = document.getElementById('txtTuKhoa').value;
    tuKhoa = stringToSlug(tuKhoa);
    var mangNhanVienTimKiem = [];
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nv = mangNhanVien[index];
        var loaiNhanVien = stringToSlug(nv.xepLoai);
        if (loaiNhanVien.search(tuKhoa) !== -1) {
            mangNhanVienTimKiem.push(nv);
        }
    }

    renderTableNhanVien(mangNhanVienTimKiem);
}
function stringToSlug(title) {
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}