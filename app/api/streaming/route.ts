
// import * as streamingAvailability from "streaming-availability";

// const RAPID_API_KEY = process.env.RAPIDAPI_KEY!;
// export async function GET() {
// const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
// 	apiKey: RAPID_API_KEY
// }));
// const data = await client.showsApi.searchShowsByFilters({
// 	country: "gb",
// 	orderBy: "popularity_1week",
// });
//   console.log(data);
//   return Response.json(data);
// }

import * as streamingAvailability from "streaming-availability";

const RAPID_API_KEY = process.env.RAPIDAPI_KEY!;

export async function GET() {
const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
	apiKey: RAPID_API_KEY
}));
const data = await client.showsApi.getTopShows({
	country: "us",
	service: "hbo",
	showType: "series",
});

  console.log(data);
  return Response.json(data);
}
