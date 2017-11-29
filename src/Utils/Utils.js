export const checkNotNull = (obj)=>
{
    return obj && obj !== 'null' && obj !== 'undefined' ;
};

 export const isHasToken = (obj) =>
{
    return checkNotNull(obj) && checkNotNull(obj.token);
}

// export const formatItem = (message,formatText) =>
// {
//   var arr = formatText.split(',');


//   if(arr.length > 0)
//   {
//     // var separators = ['qqqq', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?'];
//     console.log(arr.join('|'));
//     var tokens = message.split(new RegExp(arr.join('|'), 'g'));
//     if(tokens.length > 0)
//     {
//       return tokens.map(function(unit){return <p>{unit}</p>});
//     }
//     else
//     {
//       return <p>{message}</p>;
//     }
//   }
//   else
//   {
//     return <p>{message}</p>;
//   }
// }

// export const formatArrItem = (message,format) =>
// {
//   var messageSp = message.split(format);
//   if(messageSp.length > 0)
//   {
//     return messageSp.map(function(unit){return <p>{message}</p>});
//   }
//   else
//   {
//     return <p>{message}</p>;
//   }
// }

