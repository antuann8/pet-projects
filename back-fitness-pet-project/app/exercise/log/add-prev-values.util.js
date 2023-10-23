export const addPrevValues = (log, prevLog = null) => {
	return log.times.map((log, prevLog) => ({
		...item,
		prevWeight: prevLog ? prevLog.times[index].weight : 0,
		prevRepeat: prevLog ? prevLog.times[index].repeat : 0
	}))
}
