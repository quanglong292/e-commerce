import React, { memo } from "react";
import CInput from "../CInput";

const demoFormSchema = [{
  label: "Test single",
  type: "text",
  field: "caa"
}];

const FormBuilder2 = (props) => {
  const { formSchema } = props;
  return (
    <div className="">
      <section>FormBuilder2</section>
      <section>
        <form>
          <GenerateInputs schema={formSchema} />
        </form>
      </section>
    </div>
  );
};

var GenerateInputs = memo(function (props) {
  const { schema } = props;

  return schema.map((i) => {
    if (Array.isArray(i)) return i.map((j) => <CInput {...j} />);

    return <CInput {...i} />;
  });
});

export default FormBuilder2;
