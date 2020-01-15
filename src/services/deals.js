import request from 'utils/request';

const List = ({type, modelID, page}) => {
  const data = {
    type, modelID, page
  }
  return data
}

export default { List }