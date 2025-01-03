const { Todo } = require('../models');

const todoSeeder = async () => {
  await Todo.bulkCreate([
    {
      title: '아침 운동하기',
      done: false,
    },
    {
      title: '점심 식사 준비하기',
      done: false,
    },
    {
      title: '저녁에 책 읽기',
      done: false,
    },
    {
      title: '코딩 과제 완성하기',
      done: false,
    },
  ]);

  console.log('Todo 시드 데이터가 성공적으로 추가되었습니다.');
};

module.exports = todoSeeder;
