const handleChannelUpdate = async (channel,updateData) => {
  await channel.updatePartial({set:updateData})
 }