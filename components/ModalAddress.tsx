import { Button, Modal } from "native-base";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import { t } from "i18next";
import { Address } from "../types/customer";
import { useCreateAddress } from "../api/customer";
import Spinner from "./helpers/Spinner";

const ModalAddress = ({
  idCustomer,
  post,
  open,
  setOpen,
  setSubmit,
}: {
  idCustomer: string;
  post: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSubmit: Dispatch<SetStateAction<boolean>>;
}) => {
  const defaultData: Address = {
    title: "",
    city: "",
    line1: "",
    line2: "",
    zip: "",
    created: null,
    id: idCustomer,
    default: false,
  };

  const transformData = (params: any) => ({
    title: "",
    city: "",
    line1: "",
    line2: "",
    zip: "",
    created: null,
    id: null,
    default: false,
  });
  const [errors, setErrors] = useState<Object>({});
  const [formData, setData] = useState<Address>(
    post === "new" ? defaultData : transformData({})
  );
  const createMutation = useCreateAddress();

  const validate = (formData: Address) => {
    if (formData.title === undefined || formData.title === "") {
      setErrors({ ...errors, title: t("address.validations.title") });
      return false;
    } else if (!formData.city) {
      setErrors({ ...errors, city: t("address.validations.city") });
      return false;
    } else if (!formData.line1) {
      setErrors({ ...errors, line1: t("address.validations.line1") });
      return false;
    } else if (!formData.zip) {
      setErrors({ ...errors, zip: t("address.validations.zip") });
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = (formData: Address) => {
    if (validate(formData)) {
      formData.id = idCustomer;
      setData(defaultData);
      createMutation.mutate(formData);
    }
  };

  useEffect(() => {
    if (createMutation.isSuccess) {
      setSubmit(true);
      setOpen(false);
    }
  }, [createMutation.isSuccess]);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
      <Modal.Content maxWidth="450">
        <Modal.CloseButton />
        <Modal.Header>{t("address.new")}</Modal.Header>
        <Modal.Body>
          {createMutation.isPending ? (
            <Spinner />
          ) : (
            <AddressForm
              post={"new"}
              params={() => {}}
              errors={errors}
              setErrors={setErrors}
              formData={formData}
              setData={setData}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setOpen(false);
              }}
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
};

export default ModalAddress;
