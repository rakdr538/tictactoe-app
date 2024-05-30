interface Props {
    strikeClass: string;
  }

const Strike: React.FC<Props> = ({strikeClass}) => {
    return ( <div className={`strike ${strikeClass}`}></div> 
    );
}

export default Strike;