function createChannel(type,name,details,chatClient){
    const channel = chatClient.channel(type,name,details)
    await channel.watch()
}
