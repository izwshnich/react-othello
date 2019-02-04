import * as React from 'react'

interface IProps {
  name?: string
}

const Hello = (props: IProps) =>
  <div>Hello, {props.name}</div>

export default Hello