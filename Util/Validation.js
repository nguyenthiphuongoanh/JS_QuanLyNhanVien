function Validation () {
    this.kiemTraRong = function (value,idError,name) {
        if(value.trim() === ''){
            document.getElementById(idError).innerHTML = `${name} không được bỏ trống !`;
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    }
    this.kiemTraKyTu = function (value,idError,name) {
        var regexLetter = /^[A-Z a-z]+$/;
        //Nếu chuỗi định dạng test thành công value thì true
        if(regexLetter.test(value)){
            document.getElementById(idError).innerHTML = ''
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} tất cả phải là ký tự`;
        return false;
    }
    this.kiemTraEmail = function (value,idError,name) {
        var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regexEmail.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ!`;
        return false;
    }
    this.kiemTraSo = function (value,idError,name) {
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)){
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ!`;
        return false;
    }

    this.kiemTraDoDai = function (value,idError,name,minLength,maxLength) {
        // 'abcd'.length = 4
        if(value.length > maxLength || value.length < minLength) {
            document.getElementById(idError).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký tự !`;
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    }

    this.kiemTraGiaTri = function (value,idError,name,minValue,maxValue) {
        var regexNumber = /^[0-9.]+$/;
        if(regexNumber.test(value)){
            //Kiểm tra giá trị
            if(Number(value) < minValue || Number(value) > maxValue) {
                document.getElementById(idError).innerHTML = `${name} hợp lệ từ ${minValue} đến ${maxValue} !`;
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} giá trị không hợp lệ !`;
        return false;
    }

    this.kiemTraMatKhau = function (value,idError,name) {
        var regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
        if(regexPass.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name}  từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt) !`;
        return false;
    }

    this.kiemTraDinhDangNgay = function (value,idError,name) {
        var dateformat  =  /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;
        if (value.match(dateformat)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} chưa đúng định dạng mm/dd/yyyy!`;
        return false;
    }

    this.kiemTraChucVuHopLe = function (value,idError) {
        var postionList = ['Nhân viên', 'Trưởng phòng', 'Giám đốc'];
        if(postionList.includes(value)){
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `Vui lòng chọn chức vụ`;
        return false;
    }

}