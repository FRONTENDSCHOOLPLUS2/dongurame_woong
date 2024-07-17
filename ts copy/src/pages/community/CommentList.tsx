// import Submit from "@/components/Submit";
import CommentNew from "@/pages/community/CommentNew";
import CommentItem from "./CommentItem";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ApiRes, MultiItem, Post } from "@/types";

const SERVER = import.meta.env.VITE_API_SERVER;

async function fetchComments(postId: string): Promise<ApiRes<MultiItem<Post>>> {
  const url = `${SERVER}/posts/${postId}/replies`;
  const res = await fetch(url);
  return res.json();
}

// export default function CommentList({ replies }) {
export default function CommentList() {
  const { type, _id } = useParams();

  const { data } = useQuery({
    queryKey: [type, _id, "replies"], //쿼리키 설정 중요
    queryFn: () => {
      return fetchComments(_id!);
    },
  });

  let list: JSX.Element[] = [];
  if (data?.ok) {
    list = data?.item.map((item) => <CommentItem key={item._id} item={item} />);
  }

  // const list = data?.item.map((item) => (
  //   <CommentItem key={item._id} item={item} />
  // ));

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">
        댓글 {(data?.ok && data?.item.length) || 0}개
      </h4>
      {list}
      {/* <CommentItem /> */}

      {/* <div className="shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <img
            className="w-8 mr-2 rounded-full"
            src="https://api.fesp.shop/files/00-sample/user-muzi.webp"
            alt="무지 프로필 이미지"
          />
          <a href="" className="text-orange-400">
            무지
          </a>
          <time
            className="ml-auto text-gray-500"
            dateTime="2024.07.07 12:34:56"
          >
            2024.07.07 12:34:56
          </time>
        </div>
        <div className="flex justify-between items-center mb-2">
          <form action="#">
            <pre className="whitespace-pre-wrap text-sm">축하해요~~~</pre>
            <Submit bgColor="red" size="sm">
              삭제
            </Submit>
          </form>
        </div>
      </div> */}

      <CommentNew />
    </section>
  );
}
