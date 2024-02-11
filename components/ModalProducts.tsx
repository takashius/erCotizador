import { useEffect, useState } from "react";
import { ProductForm } from "../types/products";
import { ModalProductProps } from "../types/general";
import { useCreateProduct, useUpdateProduct } from "../api/cotiza";
import { t } from "i18next";
import { Button, Modal } from "native-base";
import Spinner from "./helpers/Spinner";
import FormProduct from "./FormProduct";
import { useListProduct } from "../api/product";

const ModalProducts = ({
  idCotiza,
  post,
  open,
  setOpen,
  setSubmit,
  params,
}: ModalProductProps) => {
  const defaultData: ProductForm = {
    master: "",
    name: "",
    description: "",
    price: 0,
    id: idCotiza,
    amount: 1,
    iva: false,
  };
  const [errors, setErrors] = useState<Object>({});
  const [formData, setData] = useState<ProductForm>(defaultData);
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const productList = useListProduct();

  const validate = (formData: ProductForm) => {
    if (formData.price === 0 || formData.price === undefined) {
      setErrors({ ...errors, price: t("products.validations.priceRequired") });
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = (formData: ProductForm) => {
    if (validate(formData)) {
      formData.id = idCotiza;
      console.log('formData', JSON.stringify(formData, null, 2));
      // setData(defaultData);
      if (post === "new") {
        // createMutation.mutate(formData);
      } else {
        // updateMutation.mutate(formData);
      }
    }
  };

  useEffect(() => {
    if (createMutation.isSuccess || updateMutation.isSuccess) {
      setSubmit(true);
      setOpen(false);
    }
  }, [createMutation.isSuccess, updateMutation.isSuccess]);

  useEffect(() => {
    if (params && post === "edit") {
      setData(transformData(params!));
    } else {
      setData(defaultData);
    }
  }, [params, open]);

  const onClose = () => {
    setOpen(false);
    setData(defaultData);
  };

  const transformData = (params: ProductForm) => ({
    master: params?.master ? params.master : "",
    name: params?.name ? params.name : "",
    description: params?.description ? params.description : "",
    price: params?.price ? params.price : 0,
    amount: params?.amount ? params.amount : 1,
    iva: params?.iva ? params.iva : false,
    id: params?.id!
  });

  return (
    <Modal isOpen={open} onClose={() => onClose()} safeAreaTop={true}>
      <Modal.Content maxWidth="450">
        <Modal.CloseButton />
        <Modal.Header>
          {post === "new" ? t("products.add") : t("products.edit")}
        </Modal.Header>
        <Modal.Body>
          {createMutation.isPending ? (
            <Spinner />
          ) : (
            <FormProduct
              post={"new"}
              params={params}
              errors={errors}
              setErrors={setErrors}
              formData={formData}
              setData={setData}
              productList={productList}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => onClose()}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                onSubmit(formData);
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );

}
export default ModalProducts;