import { useEffect } from 'react';

function DocumentTitle(title) {
  useEffect(() => {
    document.title = `${title} | Tafsiri`;
  }, [title]);
}
export default DocumentTitle;
