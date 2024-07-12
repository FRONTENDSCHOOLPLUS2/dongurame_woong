import styled from "styled-components";

export const InputStyle = styled.input`
  width: 100%; /* w-full */
  padding-left: 0.75rem; /* px-3 */
  padding-right: 0.75rem; /* px-3 */
  padding-top: 0.5rem; /* py-2 */
  padding-bottom: 0.5rem; /* py-2 */
  border-width: 1px; /* border */
  border-radius: 0.5rem; /* rounded-lg */
  outline: none; /* focus:outline-none */

  /* 포커스 시 스타일 */
  &:focus {
    border-color: #fb923c; /* focus:border-orange-400 */
  }

  /* 다크 모드 스타일 */
  @media (prefers-color-scheme: dark) {
    background-color: #374151; /* dark:bg-gray-700 */
  }
`;

export const LabelStyle = styled.label`
  display: block; /* block */
  color: #4a5568; /* text-gray-700 */
  margin-bottom: 0.5rem; /* mb-2 */

  /* 다크 모드 스타일 */
  @media (prefers-color-scheme: dark) {
    color: #e2e8f0; /* dark:text-gray-200 */
  }
`;

export const Incorrect = styled.p`
  margin-left: 0.5rem; /* ml-2 */
  margin-top: 0.25rem; /* mt-1 */
  font-size: 0.875rem; /* text-sm */
  color: #f56565; /* text-red-500 */

  /* 다크 모드 스타일 */
  @media (prefers-color-scheme: dark) {
    color: #fc8181; /* dark:text-red-400 */
  }
`;
