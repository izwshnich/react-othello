import Hello from 'components/Hello'
import * as React from 'react'
import { hot } from 'react-hot-loader/root'

interface IProps {
  name?: string
}

const App: React.FC<IProps> = (props: IProps) => <Hello name={props.name} />

App.defaultProps = {
  name: 'World'
}

export default hot(App)