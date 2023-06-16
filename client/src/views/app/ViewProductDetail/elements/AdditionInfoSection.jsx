import { Button, Input, Rate, Tabs, Tag } from "antd";
import React, { useEffect, useState } from "react";
import fetcher from "../../../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import useProductStore from "../../../../store/product.zustand";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import formatDate from "../../../../utils/helpers/formatDate";
import useGlobalStore from "../../../../store/global.zustand";
import { CheckCircleOutlined } from "@ant-design/icons";
import CButton from "../../../../components/core/CButton";

const PRODUCT_DETAIL_ADDITION_SECTION_TABS = [
  {
    label: "Detail",
    key: "detail",
    children: <DetailTab />,
  },
  {
    label: "Review",
    key: "review",
    children: <ReviewTab />,
  },
];

const AdditionInfoSection = () => {
  const fetchComments = useProductStore((state) => state.fetchComments);
  const { id } = useParams();
  useEffect(() => {
    fetchComments(id);
  }, [id]);

  return (
    <div className="">
      <Tabs
        // onChange={onChange}
        type="card"
        items={PRODUCT_DETAIL_ADDITION_SECTION_TABS}
        tabBarStyle={{
          borderRadius: "0"
        }}
      />
    </div>
  );
};

export default AdditionInfoSection;

// Sub-components

function DetailTab() {
  const { id } = useParams();
  const products = useProductStore((state) => state.products);
  const product = products.find((i) => i.id === id) ?? {};

  return (
    <div className="p-4 border-b-2">
      {product?.description
        ? product.description
        : `Product #: HR0500 Dominate the paint and shatter backboards like Dr. Shaq
      in the Reebok Shaq Attaq. Hitting the scene in 1992, these silhouettes are
      celebrating 30 years of Shaq’s feats on the court and symbolize the
      journey of how a man carved his way into a legend of the sport. Paying a
      nod to Diesel’s undeniable power and explosiveness, the Reebok Shaq Attaq
      lets you walk in his footsteps of excellence and dominate the court like a
      beast.`}
    </div>
  );
}

function ReviewTab() {
  const { comments, fetchComments } = useProductStore((state) => state);
  const { user, toggleLoginModal } = useGlobalStore((state) => state);
  const { id } = useParams();
  const navigate = useNavigate()

  const [form, setForm] = useState({});
  const onChange = (e, key) => {
    setForm({ ...form, [key]: e });
  };

  // Functions
  const createCommentValidator = () => {
    if (!user) {
      // toggleLoginModal();
      navigate("/auth/app")
      return false;
    }

    return true;
  };

  const createComment = async () => {
    const isValidToCreate = createCommentValidator();
    if (!isValidToCreate) return;

    try {
      await fetcher(REQUEST_PARAMS.ADD_COMMENT, {
        ...form,
        userId: user.userName,
        productId: id,
        isBought: user.orderHistory
          .map((i) => i.products)
          .map((i) => i.id)
          .includes(id),
      });
      await fetchComments(id);
    } catch (err) {}
  };

  return (
    <div className="p-4 border-b-2">
      <div className="text-2xl font-bold">Reviews</div>
      <div className="mt-4 pl-4 flex flex-col gap-2">
        {comments.length ? (
          <>
            <div className="p-4 border-2 flex flex-col gap-2">
              <Rate
                onChange={(e) => onChange(e, "rating")}
                style={{ color: "black" }}
                size
              />
              <Input
                onInput={(e) => onChange(e.currentTarget.value, "content")}
                placeholder="Description..."
              />
              <div className="w-fit">
                <CButton
                  onClick={createComment}
                  type="black"
                  className="w-fit px-6 py-1 mt-2"
                >
                  Send
                </CButton>
              </div>
            </div>
            {comments.map((i) => (
              <div className="my-2 border-b-[1px] pb-2">
                <div className="flex gap-4 items-start">
                  <div className="text-lg font-semibold">{i.userId}: </div>
                  <div>
                    <Rate
                      value={i.rating}
                      disabled
                      style={{ color: "black", fontSize: "14px" }}
                    />
                  </div>
                  <div>-</div>
                  <div className="text-gray-500">{formatDate(i.date)}</div>
                  <>
                    {i.isBought ? (
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        Bought
                      </Tag>
                    ) : (
                      <Tag color="">Guest</Tag>
                    )}
                  </>
                </div>
                <div className="text-sm">{i.content}</div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="text-lg">Review this product</div>
            <Rate onChange={(e) => onChange(e, "rating")} />
            <Input
              onInput={(e) => onChange(e.currentTarget.value, "content")}
              placeholder="Description..."
            />
            <Button onClick={createComment} className="w-fit" type="primary">
              Send
            </Button>
            <div>Be the first to review this product</div>
          </>
        )}
      </div>
    </div>
  );
}
