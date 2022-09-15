// function CustomChannelPreview (props) {
//   const {channel, setActiveChannel} = props;
//   const {messages} = channel.state;
//   const lastMessage = messages[messages.length - 1];

//   return (
//     <div>
//       <button
//         onClick={() => setActiveChannel(channel)}
//         style={{
//           margin: '12px'
//         }}
//       >
//         <div>{channel.data.name}</div>
//       </button>
//       <button onClick={() => handleChannelCreate}>+</button>
//       <button onClick={() => handleChannelUpdate(channel)}><span role="button">Upd</span></button>
//       <button onClick={()=>handleChannelDelete(channel)}>X</button>
//     </div>
//   )
// }