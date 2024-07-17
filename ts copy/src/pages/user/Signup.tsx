import InputError from "@/components/InputError";
import Submit from "@/components/Submit";
import { ApiResWithValidation, SingleItem, User } from "@/types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_API_SERVER;

type UserForm = {
  type: "user" | "seller";
  name: string;
  email: string;
  password: string;
  attach?: string | string[];
  profileImage?: string;
};

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserForm>(); //사용자인증 및 폼의 내용을 스테이트없이 확인하는법

  async function addUser(formData: UserForm) {
    try {
      //이미지가 있다면 이미지 없로드 먼저
      if (formData.attach !== undefined && formData.attach.length > 0) {
        const body = new FormData();
        body.append("attach", formData.attach[0]);
        const fileRes = await fetch(`${SERVER}/files`, {
          method: "POST",
          body,
        });

        const resJson = await fileRes.json();

        if (!resJson.ok) {
          throw new Error("파일업로드 실패!!");
        }
        formData.profileImage = resJson.item[0].path; //이미지가 있을때 이미지를 formData에 이미지 업로드
      }
      //회원가입
      formData.type = "user";
      delete formData.attach;

      const res = await fetch(`${SERVER}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), //JSON표기법은 객체를 직렬화시켜 통신할수있음
      });

      const resData: ApiResWithValidation<
        SingleItem<User>,
        UserForm
      > = await res.json(); //직렬화된 데이터를 다시 json으로 변환

      if (resData.ok) {
        alert(`${resData.item.name}님 회원가입을 축하합니다!!`);
        navigate("/");
      } else {
        //API 서버의 에러 메세지 처리
        if ("errors" in resData) {
          resData.errors.forEach((error) =>
            setError(error.path, { message: error.msg })
          );
        } else if (resData.message) {
          alert(resData.message);
        }
      }
    } catch (err) {
      //네트워크 에러에 대한 처리
      console.error(err);
    }
  }

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form action="/" onSubmit={handleSubmit(addUser)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("name", {
                required: "이름을 입력해주세요!!",
                minLength: {
                  value: 2,
                  message: "이름을 2글자 이상 입력하세요!!",
                },
              })}
            />
            <InputError target={errors.name} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("email", {
                required: "이메일을 입력해주세요!!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                  message: "이메일 형식이 아닙니다!!",
                },
              })}
            />
            <InputError target={errors.email} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("password", {
                required: "비밀번호를 입력해주세요!!",
              })}
            />
            <InputError target={errors.password} />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="attach"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="attach"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              {...register("attach")}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <Submit>회원가입</Submit>
            <a
              href="/"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              취소
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
