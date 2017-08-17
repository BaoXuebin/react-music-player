import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

ReactDOM.render(<Root />, document.getElementById('root'));

// 热更新处理逻辑
if (module.hot) {
    module.hot.accept();
}
