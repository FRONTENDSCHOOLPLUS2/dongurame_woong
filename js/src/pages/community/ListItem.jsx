import React, { useEffect, useState } from "react";

function ListItem() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://api.fesp.shop/posts", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => setPosts(result.item))
      .catch((error) => {
        console.error("게시글 불러오기 실패");
        // 에러 시 처리 로직
      });
  }, []);

  return (
    <>
      {posts && //처음에 posts를 불러오면 빈배열이기 때문에 에러발생 posts를 먼저 불러오고 posts의 배열들 불러오기
        posts.map((post, index) => {
          index = posts.length - index;
          return (
            <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
              <td className="p-2 text-center">{index}</td>
              <td
                className="p-2 truncate indent-4 cursor-pointer"
                onClick={() => (location.href = "/info/2")}
              >
                {post.title}
              </td>
              <td className="p-2 text-center truncate">{post.user.name}</td>
              <td className="p-2 text-center hidden sm:table-cell">
                {post.views}
              </td>
              <td className="p-2 text-center hidden sm:table-cell">
                {post.repliesCount}
              </td>
              <td className="p-2 truncate text-center hidden sm:table-cell">
                {post.createdAt}
              </td>
            </tr>
          );
        })}
    </>
  );
}

export default ListItem;
