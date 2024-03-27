exports.listUser = async (req, res, next) => {
    try {
        const list = await md.userModel.find();

        if (list.length > 0)
            objReturn.data = list;
        else {
            objReturn.status = 0;
            objReturn.msg = 'Không có dữ liệu phù hợp';
        }
        res.json(objReturn);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: error.message });
    }
} 


exports.addUser = async (req, res, next) => {
    try {
        const { userName, userPass, adressWallet, point, pointComplete, userPms } = req.body;
        const hashedPassword = await bcrypt.hash(userPass, 10);
        const newUser = new md.userModel({
            userName,
            userPass: hashedPassword,
            adressWallet,
            point,
            pointComplete,
            userPms
        });
        await newUser.save();
        objReturn.msg = 'Thêm thành công';
        res.json(objReturn);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.userLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await md.userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
        const passwordMatch = await bcrypt.compare(password, user.userPass);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }
        objReturn.msg = 'Đăng nhập thành công';
        res.status(200).json(objReturn);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await md.userModel.findByIdAndUpdate(req.params.idu, req.body, { new: true });
        objReturn.msg = 'Cập nhật thành công';
        res.json(objReturn);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        await md.userModel.findByIdAndDelete(req.params.idu);
        objReturn.msg = 'Xóa thành công';
        res.json(objReturn);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};