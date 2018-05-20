import React from 'react'
import classnames from 'classnames'

export default ({className,name,...args})=>{
    return <i {...args} className={classnames('iconfont',`icon-${name}`,className)}/>
};