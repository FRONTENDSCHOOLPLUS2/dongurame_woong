import Button from "@components/Button";
import React from "react";

function CommentItem() {
  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          src="http://api.fesp.shop/files/00-sample/user-muzi.webp"
          alt="어피치 프로필 이미지"
        />
        <a href="" className="text-orange-400">
          어피치
        </a>
        <time className="ml-auto text-gray-500" dateTime="2024.07.02 14:11:22">
          2024.07.02 14:11:22
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <pre className="whitespace-pre-wrap text-sm">축하해요~~</pre>
        <Button bgColor="red" size="sm">
          삭제
        </Button>
      </div>
    </div>
  );
}

export default CommentItem;
