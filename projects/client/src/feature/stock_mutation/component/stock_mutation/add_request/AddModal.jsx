import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../../../components/CustomInput";
import CustomSelectFormikHook from "../../../../../components/CustomSelectFormikHook";
import { getCategories, getProducts } from "../../../../admin_product";
import RenderCategoryOptions from "../../../../admin_product/component/RenderCategoryOptions";
import RenderProductsOption from "./RenderProductsOption";
import { getWarehouses } from "../../../../admin_warehouse";
import RenderWarehouse from "../../../../admin/component/all_admin/edit_data/RenderWarehouse";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";
import { createNewMutationRequest } from "../../../";

function AddModal(props) {
  const { setNewRequest, admin } = props;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouse, SetWarehouse] = useState([]);

  const validationSchema = Yup.object().shape({
    created_by: Yup.string().required("required"),
    id_category: Yup.number().required("required"),
    id_product: Yup.number().required("required"),
    quantity: Yup.number().min(1).required("required"),
    from_id_warehouse: Yup.number().required("required"),
    to_id_warehouse: Yup.number().required("required"),
  });

  const formik = useFormik({
    initialValues: {
      created_by: admin.username,
      id_category: "",
      id_product: "",
      quantity: 0,
      from_id_warehouse: "",
      to_id_warehouse: admin.id_warehouse || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      let { from_id_warehouse, to_id_warehouse, id_product, quantity } = values;
      from_id_warehouse = parseInt(from_id_warehouse);
      to_id_warehouse = parseInt(to_id_warehouse);
      id_product = parseInt(id_product);
      const id_user = admin?.id_user;
      const dataToSend = { id_user, id_product, quantity, from_id_warehouse, to_id_warehouse };
      const response = await createNewMutationRequest(dataToSend);
      alert(response.message);
      setNewRequest(false);
    },
  });

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      const warehouses = await getWarehouses("");
      SetWarehouse([...warehouses.result]);
      setCategories([...response.categories]);
    })();
  }, []);

  const categoriesChange = async (e) => {
    const response = await getProducts("", "", "", e.target.value);
    setProducts([...response?.result?.productsList]);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setNewRequest} />
        <div className="modal-header-container">
          <h1 className="modal-header-text">New Product Mutation Request</h1>
          <form className="modal-body-container gap-2" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              name="created_by"
              id="created_by"
              formik={formik}
              label="created by"
              isDisabled={true}
            />
            <CustomSelectFormikHook
              formik={formik}
              label="category"
              name="id_category"
              additionalFunction={categoriesChange}
            >
              <RenderCategoryOptions categories={categories} />
            </CustomSelectFormikHook>
            <CustomSelectFormikHook formik={formik} label="product" name="id_product">
              <RenderProductsOption products={products} />
            </CustomSelectFormikHook>
            <CustomInput type="number" name="quantity" id="quantity" formik={formik} label="quantity" />
            <CustomSelectFormikHook formik={formik} label="mutation from-warehouse" name="from_id_warehouse">
              <RenderWarehouse warehouses={warehouse} />
            </CustomSelectFormikHook>
            <CustomSelectFormikHook
              formik={formik}
              label="mutation to-warehouse"
              name="to_id_warehouse"
              isDisabled={admin?.id_warehouse}
            >
              <RenderWarehouse warehouses={warehouse} />
            </CustomSelectFormikHook>
            <div className="grid grid-cols-3 gap-2 text-sm h-8 mt-4">
              <button type="submit" onClick={formik.handleSubmit} className="bg-primary text-white h-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
