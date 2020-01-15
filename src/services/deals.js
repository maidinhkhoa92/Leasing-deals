import request from 'utils/request';

const List = ({type, modelID, page}) => {
  return request({
    url: '/get-all-deals',
    method: 'post',
    data: {
      type,
      modelID,
      page
    } 
  });
};

export default { List }
