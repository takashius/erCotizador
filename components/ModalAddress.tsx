import { Button, Modal } from "native-base";
import { Dispatch, SetStateAction, useState } from "react";
import AddressForm from "./AddressForm";
import { t } from "i18next";
import { Address } from "../types/customer";

const ModalAddress = ({
  post,
  open,
  setOpen,
  setSubmit,
}: {
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
    _id: null,
    default: false,
  };

  const transformData = (params: any) => ({
    title: "",
    city: "",
    line1: "",
    line2: "",
    zip: "",
    created: null,
    _id: null,
    default: false,
  });
  const [errors, setErrors] = useState<Object>({});
  const [formData, setData] = useState<Address>(
    post === "new" ? defaultData : transformData({})
  );

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
      console.log("FORM DATA", formData);
      setOpen(false);
      setSubmit(true);
    }
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
      <Modal.Content maxWidth="450">
        <Modal.CloseButton />
        <Modal.Header>{t("address.new")}</Modal.Header>
        <Modal.Body>
          <AddressForm
            post={"new"}
            params={() => {}}
            errors={errors}
            setErrors={setErrors}
            formData={formData}
            setData={setData}
          />
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
