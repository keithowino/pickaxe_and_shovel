// GitHub REST API helpers
const BASE = "https://api.github.com";

function headers(token) {
	return {
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
}

export async function fetchUserRepos(username, token) {
	const res = await fetch(
		`${BASE}/users/${username}/repos?per_page=100&sort=updated`,
		{ headers: headers(token) },
	);
	if (!res.ok)
		throw new Error(`GitHub error ${res.status}: ${res.statusText}`);
	return res.json();
}

export async function fetchRepoDetails(owner, repo, token) {
	const [repoRes, langRes, topicsRes] = await Promise.all([
		fetch(`${BASE}/repos/${owner}/${repo}`, { headers: headers(token) }),
		fetch(`${BASE}/repos/${owner}/${repo}/languages`, {
			headers: headers(token),
		}),
		fetch(`${BASE}/repos/${owner}/${repo}/topics`, {
			headers: headers(token),
		}),
	]);
	if (!repoRes.ok) throw new Error(`GitHub error ${repoRes.status}`);
	const repoData = await repoRes.json();
	const languages = langRes.ok ? Object.keys(await langRes.json()) : [];
	const topicsData = topicsRes.ok ? await topicsRes.json() : { names: [] };
	return { repo: repoData, languages, topics: topicsData.names || [] };
}

export function inferCategory(topics = []) {
	const t = topics.map((x) => x.toLowerCase());
	if (
		t.some((x) =>
			["mechatronics", "arduino", "embedded", "firmware"].includes(x),
		)
	)
		return "Mechatronics";
	if (
		t.some((x) =>
			["iot", "esp32", "raspberrypi", "raspberry-pi", "mqtt"].includes(x),
		)
	)
		return "IoT";
	if (t.some((x) => ["robot", "robotics", "ros"].includes(x)))
		return "Robotics";
	if (t.some((x) => ["wip", "in-progress", "work-in-progress"].includes(x)))
		return "In Progress";
	return "Web";
}

export function mapRepoToProject({ repo, languages, topics }) {
	const techStack = Array.from(
		new Set([...(languages || []), ...(topics || [])]),
	).filter(Boolean);
	return {
		github_repo_id: repo.id,
		name: repo.name,
		description: repo.description || "",
		github_url: repo.html_url,
		live_url: repo.homepage || "",
		stars: repo.stargazers_count || 0,
		forks: repo.forks_count || 0,
		primary_language: repo.language || languages?.[0] || "",
		tech_stack: techStack,
		topics: topics || [],
		category: inferCategory(topics),
	};
}
