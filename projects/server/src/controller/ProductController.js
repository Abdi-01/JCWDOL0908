const { UploadPhoto, UnlinkPhoto, UploadPhotoEditData } = require("../helper/Multer");
const { CategoryService, ProductService } = require("../service");
const { AdminDataValidation } = require("../validation");

const postNewProduct = async (req, res, next) => {
  try {
    const upload = await UploadPhoto("products");
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({
          message: err.message,
          data: null,
        });
      }
      const product_image = req.uniqueUrl;
      let data = JSON.parse(req.body.data);
      data = { ...data, product_image };

      var { error, value } = await AdminDataValidation.CreateNewProduct.validate({ ...data });
      if (error) throw error;

      var { error, result } = await ProductService.postNewProductLogic(data);

      if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
      if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

      return res.status(202).send({ isSuccess: true, message: "success create product", result });
    });
  } catch (error) {
    await UnlinkPhoto(req.uniqueUrl);
    next(error);
  }
};

module.exports = { postNewProduct };
