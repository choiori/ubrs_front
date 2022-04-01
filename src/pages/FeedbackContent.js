import React, { useEffect, useState } from 'react';
import API from '../API';
import { useForm } from 'react-hook-form';
import './FeedbackContent.scss';

const FeedbackContent = (props) => {
  const [dongName, setDongName] = useState(props.dongName);
  const [commentNo, setCommentNo] = useState();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  useState(() => {
    setDongName(props.dongName);
    console.log('이름: ', dongName);
    setCommentNo(props.feedbackNo + 'Comment');
  }, []);
  const submitComment = async (c) => {
    console.log('코멘트: ', comment);
    await API.post(`api/comment/${props.userID}/${props.requestTime}`, {
      commentNo: 'comment' + props.feedbackNo.slice(-1),
      comment: c,
    });
    console.log('서버에 보냈습니다.');
  };
  const onValid = (data) => {
    console.log(data);
    console.log(props.feedbackNo);
    // setCommentNo('comment' + props.feedbackNo.slice(-1));
    console.log(commentNo);
    //console.log(tmp);
    submitComment(data['comment']);
    alert('서버로 전송되었습니다!👍');
  };

  const { comment } = getValues();

  return (
    <div>
      <div>
        추천결과 <span className="bold">{props.dongName}</span> 은(는)
        어떠셨나요?
      </div>
      <div className="small">
        ubrs 서비스에 대해 자유롭게 이야기 해주세요 :)
      </div>
      <br />
      <form onSubmit={handleSubmit(onValid)}>
        <textarea
          className="text"
          {...register('comment', { required: true })}
        />
        &nbsp; &nbsp;
        <input type="submit" value="의견보내기" className="submit" />
        {errors.comment && (
          <span className="error">
            {' '}
            <br /> 의견을 적어주세요!
          </span>
        )}
      </form>
    </div>
  );
};

export default FeedbackContent;
