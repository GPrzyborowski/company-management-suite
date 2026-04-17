import { Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts'

function WorkGraph({ data }) {
	if (!Array.isArray(data) || data.length == 0) return null

	const chartData = data.reduce((acc, session) => {
		const date = session.startedAt.split('T')[0]
		const start = new Date(session.startedAt)
		const end = new Date(session.endedAt)
		const durationHours = (end - start) / 1000 / 3600

		const existing = acc.find(item => item.name == date)
		if (existing) {
			existing.duration += durationHours
		} else {
			acc.push({ name: date, duration: durationHours })
		}

		return acc
	}, [])

	chartData.forEach(item => {
		item.duration = Number(item.duration.toFixed(1))
	})

	return (
		<LineChart width={500} height={300} data={chartData}>
			<XAxis dataKey="name" />
			<YAxis unit=" h" />
			<Tooltip
                separator=": "
				labelFormatter={label => `Data: ${label}`}
				formatter={value => [`${value.toFixed(1)} h`, 'Przepracowano']}
				contentStyle={{ color: '#000' }}
				itemStyle={{ color: '#000' }}
				labelStyle={{ color: '#000' }}
			/>
			<Line dataKey="duration" type="monotone" stroke="white" strokeWidth={2} />
		</LineChart>
	)
}

export default WorkGraph
