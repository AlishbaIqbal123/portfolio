import { supabase } from './supabase';

export const uploadProjectImage = async (file: File, bucketOverride?: string) => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `projects/${fileName}`;
        const bucket = bucketOverride || 'projects';

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (error: any) {
        throw new Error('Supabase Storage Error: ' + (error.message || 'Upload failed'));
    }
};

export const uploadProjectImages = async (files: File[]) => {
    // Note: This uses the 'projects-gallery' bucket for the additional gallery images
    return Promise.all(files.map(file => uploadProjectImage(file, 'projects-gallery')));
};

export const getProjects = async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, images, image, video_url, github_link, deployed_link, tech_stack, category, is_video_primary, featured, created_at')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const getExperience = async () => {
    const { data, error } = await supabase
        .from('experience')
        .select('id, role, company, location, duration, type, description, points, link, order_index, created_at')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const getEducation = async () => {
    const { data, error } = await supabase
        .from('education')
        .select('id, degree, school, location, duration, status, details, achievements, order_index, created_at');
    if (error) throw error;
    return data;
};

export const getSkillCategories = async () => {
    const { data, error } = await supabase
        .from('skill_categories')
        .select(`
            id,
            title,
            icon,
            order_index,
            skills (
                id,
                name,
                logo_url,
                logo_url_dark,
                order_index
            )
        `)
        .order('order_index', { ascending: true });
    
    if (error) throw error;

    if (data) {
        data.forEach((category: any) => {
            if (Array.isArray(category.skills)) {
                category.skills.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0));
            }
        });
    }
    return data;
};

export const getPersonalInfo = async () => {
    const { data, error } = await supabase
        .from('admin_settings')
        .select('*');
    
    if (error) return null;
    
    const settingsObj: any = {};
    data?.forEach(s => settingsObj[s.key] = s.value);
    
    // Structure it to match the personalData format expected by components
    return {
        name: settingsObj.name || 'Alishba Iqbal',
        email: settingsObj.email || 'i.alishba1342@gmail.com',
        location: settingsObj.location || 'Vehari, Pakistan',
        bio: settingsObj.bio,
        tagline: settingsObj.tagline,
        github: settingsObj.github || 'https://github.com/AlishbaIqbal123',
        linkedin: settingsObj.linkedin || 'https://www.linkedin.com/in/alishba-iqbal-a667b6263',
        stats: settingsObj.stats || {
            projects: settingsObj.projects_count || '12',
            internships: settingsObj.internships_count || '02'
        }
    };
};
// Full curated tip library — used as static fallback when DB is unavailable
const STATIC_TIPS = [
    { id: 'st_1',  title: 'Avoid Nested Loops: Use a Set', content: 'Nested loops give O(n²) complexity. Convert the inner array to a Set for O(1) lookups, reducing overall complexity to O(n).', tutorial: "### Bad: O(n²)\n```js\nconst matches = arr1.filter(x => arr2.includes(x));\n```\n### Good: O(n)\n```js\nconst set2 = new Set(arr2);\nconst matches = arr1.filter(x => set2.has(x));\n```\nSet.has() is O(1) vs Array.includes() which is O(n).", category: 'Performance', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_2',  title: 'Replace for-loop with .map()', content: 'Use .map() instead of manually pushing into an empty array inside a for-loop. It is declarative, immutable, and cleaner.', tutorial: "### Bad\n```js\nconst results = [];\nfor (let i = 0; i < items.length; i++) {\n  results.push(items[i].value * 2);\n}\n```\n### Good\n```js\nconst results = items.map(item => item.value * 2);\n```\n.map() returns a new array without mutating the original.", category: 'Clean Code', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_3',  title: 'Use .filter() to Replace Conditional Loops', content: 'When collecting items that match a condition, .filter() is more readable than a for-loop with an if-statement inside.', tutorial: "### Bad\n```js\nconst active = [];\nfor (const user of users) {\n  if (user.isActive) active.push(user);\n}\n```\n### Good\n```js\nconst active = users.filter(user => user.isActive);\n```\nChain .filter() and .map() together for powerful pipelines.", category: 'Clean Code', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_4',  title: 'Reduce: Replace Accumulator Loops', content: '.reduce() replaces the pattern of initializing a variable and updating it inside a loop.', tutorial: "### Bad\n```js\nlet total = 0;\nfor (const item of cart) {\n  total += item.price;\n}\n```\n### Good\n```js\nconst total = cart.reduce((sum, item) => sum + item.price, 0);\n```\nAlso useful for grouping: reduce into an object or Map.", category: 'Clean Code', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_5',  title: 'Use a HashMap for O(1) Lookups', content: 'Replace O(n) array searches with a pre-built Map or object for constant-time lookups — critical in large datasets.', tutorial: "### Bad: O(n) per lookup\n```js\nfunction getUser(id) {\n  return users.find(u => u.id === id);\n}\n```\n### Good: O(1) per lookup\n```js\nconst userMap = new Map(users.map(u => [u.id, u]));\nfunction getUser(id) {\n  return userMap.get(id);\n}\n```\nBuild once, query many times efficiently.", category: 'Data Structures', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_6',  title: 'Two-Pointer Technique', content: 'For sorted arrays, use two pointers from both ends instead of nested loops. Reduces O(n²) to O(n).', tutorial: "### Finding a pair that sums to target:\n```js\nfunction hasPairWithSum(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left < right) {\n    const sum = arr[left] + arr[right];\n    if (sum === target) return true;\n    else if (sum < target) left++;\n    else right--;\n  }\n  return false;\n}\n```\nNo nested loop needed — linear time.", category: 'Algorithms', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_7',  title: 'Sliding Window for Subarray Problems', content: 'The sliding window pattern solves contiguous subarray problems in O(n) instead of O(n²) with nested loops.', tutorial: "### Max sum of k consecutive elements:\n```js\nfunction maxSum(arr, k) {\n  let sum = arr.slice(0, k).reduce((a, b) => a + b, 0);\n  let max = sum;\n  for (let i = k; i < arr.length; i++) {\n    sum += arr[i] - arr[i - k];\n    max = Math.max(max, sum);\n  }\n  return max;\n}\n```\nSlide the window instead of recomputing from scratch.", category: 'Algorithms', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_8',  title: 'Memoization: Cache Expensive Results', content: 'Memoization caches function results so repeated calls with the same input return instantly. Turns O(2^n) into O(n).', tutorial: "### Without memoization: O(2^n)\n```js\nfunction fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}\n```\n### With memoization: O(n)\n```js\nconst memo = {};\nfunction fib(n) {\n  if (n in memo) return memo[n];\n  if (n <= 1) return n;\n  return (memo[n] = fib(n - 1) + fib(n - 2));\n}\n```", category: 'Algorithms', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_9',  title: 'Optional Chaining: No More Deep Null Checks', content: 'Use optional chaining (?.) to safely access nested properties without chaining multiple && checks.', tutorial: "### Bad\n```js\nif (user && user.profile && user.profile.address) {\n  console.log(user.profile.address.city);\n}\n```\n### Good\n```js\nconsole.log(user?.profile?.address?.city ?? 'Unknown');\n```\nAlso works for optional method calls: `obj?.method?.();`", category: 'Modern JS', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_10', title: 'Nullish Coalescing: Safe Defaults', content: 'Use ?? instead of || when providing defaults. || triggers on all falsy values (0, \'\', false), but ?? only triggers on null or undefined.', tutorial: "### Bug-prone with ||\n```js\nconst count = userCount || 10; // If userCount is 0, uses 10!\n```\n### Correct with ??\n```js\nconst count = userCount ?? 10; // Only uses 10 if null/undefined\n```\nThis is critical when 0 or empty string are valid values.", category: 'Modern JS', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_11', title: 'Async/Await Over Promise Chains', content: 'async/await makes asynchronous code read like synchronous code. Use try/catch instead of .catch() for consistent error handling.', tutorial: "### Messy Promise Chain\n```js\ngetUser(id)\n  .then(user => getPosts(user.id))\n  .then(posts => render(posts))\n  .catch(err => console.error(err));\n```\n### Clean Async/Await\n```js\nasync function loadPosts(id) {\n  try {\n    const user = await getUser(id);\n    const posts = await getPosts(user.id);\n    render(posts);\n  } catch (err) {\n    console.error(err);\n  }\n}\n```", category: 'Architecture', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_12', title: 'Debounce Frequent Events', content: 'Wrap expensive handlers (resize, input, scroll) with debounce to prevent them firing on every single event.', tutorial: "### Simple debounce implementation\n```js\nfunction debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nconst onSearch = debounce((query) => fetchResults(query), 300);\ninput.addEventListener('input', e => onSearch(e.target.value));\n```\nThe API call only fires 300ms after the user stops typing.", category: 'Frontend', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_13', title: 'Early Return Pattern', content: 'Return early from functions to avoid deep nesting. Each guard clause reduces indentation and makes the happy path clear.', tutorial: "### Deeply Nested (Hard to read)\n```js\nfunction process(user) {\n  if (user) {\n    if (user.isActive) {\n      if (user.hasPermission) {\n        doWork(user);\n      }\n    }\n  }\n}\n```\n### Early Returns (Clean)\n```js\nfunction process(user) {\n  if (!user) return;\n  if (!user.isActive) return;\n  if (!user.hasPermission) return;\n  doWork(user);\n}\n```", category: 'Clean Code', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_14', title: 'Destructuring for Cleaner Access', content: 'Use object and array destructuring to extract values instead of repeatedly referencing the parent object.', tutorial: "### Without Destructuring\n```js\nfunction greet(user) {\n  console.log(user.firstName + ' ' + user.lastName);\n  console.log(user.email);\n}\n```\n### With Destructuring\n```js\nfunction greet({ firstName, lastName, email }) {\n  console.log(`${firstName} ${lastName}`);\n  console.log(email);\n}\n```\nAlso works for arrays: `const [first, second] = arr;`", category: 'Modern JS', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_15', title: 'Use Object.freeze() for Constants', content: 'When you have a configuration object that should never change, Object.freeze() prevents accidental mutations at runtime.', tutorial: "```js\nconst CONFIG = Object.freeze({\n  API_URL: 'https://api.example.com',\n  TIMEOUT: 5000,\n  MAX_RETRIES: 3\n});\n\n// This will silently fail (or throw in strict mode):\nCONFIG.API_URL = 'https://evil.com'; // No effect!\n```\nUse for app-wide constants to prevent hard-to-find mutation bugs.", category: 'Best Practices', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_16', title: 'Prefer const, Avoid var', content: 'Use const by default, let when you need reassignment, and never use var. var has function scope and hoisting which leads to unpredictable bugs.', tutorial: "### Why var is dangerous\n```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Prints: 3 3 3 (not 0 1 2!)\n```\n### Why let/const fix it\n```js\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Prints: 0 1 2\n```\nlet and const are block-scoped — no surprises.", category: 'Best Practices', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_17', title: 'DRY: Extract Repeated Logic', content: "Don't Repeat Yourself. If you write the same logic in two places, extract it into a function. Future changes only need to happen once.", tutorial: "### Repeated code is a maintenance trap\n```js\n// Component A\nconst formatted = value.toFixed(2) + '$';\n\n// Component B\nconst formatted = amount.toFixed(2) + '$';\n```\n### Extract once, use everywhere\n```js\nfunction formatCurrency(value) {\n  return value.toFixed(2) + '$';\n}\n// Both components now call formatCurrency()\n```", category: 'Software Engineering', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_18', title: 'SQL: Index Your Search Columns', content: 'A missing index on a frequently-queried column forces a full table scan — O(n). An index makes it O(log n) or O(1).', tutorial: "### Check if a query is slow\n```sql\nEXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';\n```\n### Add the index\n```sql\nCREATE INDEX idx_users_email ON users(email);\n```\nAlways index: foreign keys, columns used in WHERE, ORDER BY, or JOIN clauses.", category: 'Database', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_19', title: 'Avoid SELECT * in Production Queries', content: "SELECT * fetches every column, including large ones you don't need. Selecting only required columns reduces data transfer and improves query speed.", tutorial: "### Bad\n```sql\nSELECT * FROM users WHERE id = 1;\n-- Fetches ALL columns including large blobs\n```\n### Good\n```sql\nSELECT id, name, email FROM users WHERE id = 1;\n-- Only fetches what you need\n```\nThis is especially important on tables with TEXT or JSONB columns.", category: 'Database', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_20', title: 'React: Avoid Re-renders with useMemo', content: 'Use useMemo to memoize expensive computed values in React. Without it, the calculation runs on every single render.', tutorial: "### Bad: Re-computes every render\n```jsx\nfunction Component({ items }) {\n  const sorted = items.sort((a, b) => a.name.localeCompare(b.name));\n  return <List items={sorted} />;\n}\n```\n### Good: Only re-computes when items changes\n```jsx\nfunction Component({ items }) {\n  const sorted = useMemo(\n    () => [...items].sort((a, b) => a.name.localeCompare(b.name)),\n    [items]\n  );\n  return <List items={sorted} />;\n}\n```", category: 'Frontend', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_21', title: 'React: useCallback for Stable Functions', content: "Wrap event handlers passed to child components with useCallback so they don't cause unnecessary re-renders of the child.", tutorial: "### Without useCallback\n```jsx\n// handleClick is re-created every render!\nfunction Parent() {\n  const handleClick = () => doSomething();\n  return <Child onClick={handleClick} />;\n}\n```\n### With useCallback\n```jsx\nfunction Parent() {\n  const handleClick = useCallback(() => doSomething(), []);\n  return <Child onClick={handleClick} />;\n}\n// Child does not re-render unless handleClick changes\n```", category: 'Frontend', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_22', title: 'Binary Search: O(log n) vs O(n)', content: 'Searching through a sorted array linearly is O(n). Binary search cuts the search space in half each step, making it O(log n).', tutorial: "### Linear Search: O(n)\n```js\nfunction find(arr, target) {\n  return arr.indexOf(target); // Scans every element\n}\n```\n### Binary Search: O(log n)\n```js\nfunction binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}\n```", category: 'Algorithms', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_23', title: 'Immutability Prevents Bugs', content: 'Mutating data in-place causes subtle bugs, especially in React. Always return new objects and arrays instead of modifying the originals.', tutorial: "### Mutation bug\n```js\nconst user = { name: 'Ali', score: 10 };\nfunction addScore(u, points) {\n  u.score += points; // Mutates original!\n  return u;\n}\n```\n### Safe immutable update\n```js\nfunction addScore(u, points) {\n  return { ...u, score: u.score + points }; // New object\n}\n```\nIn arrays, use .map(), .filter(), [...arr] instead of .push() or splice.", category: 'Best Practices', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_24', title: 'Short-Circuit Evaluation', content: 'Use && and || for concise conditional logic without full if/else blocks.', tutorial: "### Instead of\n```js\nif (isLoggedIn) {\n  showDashboard();\n}\n```\n### Use\n```js\nisLoggedIn && showDashboard();\n```\n### Default values\n```js\nconst name = user.name || 'Guest';\n```\nKeep it simple — only use for one-liners to maintain readability.", category: 'Modern JS', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_25', title: 'Git: Commit Early, Commit Often', content: 'Small, frequent commits with clear messages are infinitely easier to debug with git bisect than large, monolithic commits.', tutorial: "### Bad commit history\n```\ngit commit -m 'did stuff'\ngit commit -m 'fix'\ngit commit -m 'WIP'\n```\n### Good commit history\n```\ngit commit -m 'feat: add user authentication via JWT'\ngit commit -m 'fix: resolve null check in profile loader'\ngit commit -m 'refactor: extract email validator to utils'\n```\nFollow the Conventional Commits format: type(scope): description.", category: 'IT Operations', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_26', title: 'Throttle vs Debounce', content: 'Debounce waits until events stop. Throttle allows at most one execution per time period. Use throttle for scroll/resize, debounce for search inputs.', tutorial: "### Throttle: fires at most once per 200ms\n```js\nfunction throttle(fn, limit) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= limit) {\n      lastCall = now;\n      return fn.apply(this, args);\n    }\n  };\n}\nwindow.addEventListener('scroll', throttle(onScroll, 200));\n```\nThrottle = rate limiting. Debounce = waiting for silence.", category: 'Frontend', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_27', title: 'Lazy Loading for Performance', content: "Don't load what you don't need immediately. Lazy load images, routes, and heavy components to improve initial page load time.", tutorial: "### React lazy route loading\n```jsx\nimport { lazy, Suspense } from 'react';\n\nconst Dashboard = lazy(() => import('./Dashboard'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      <Dashboard />\n    </Suspense>\n  );\n}\n```\nThe Dashboard bundle is only downloaded when the user navigates to it.", category: 'Frontend', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_28', title: 'Pure Functions: No Hidden Side Effects', content: 'A pure function always returns the same output for the same input and has no side effects. They are trivially testable and composable.', tutorial: "### Impure function (unpredictable)\n```js\nlet tax = 0.2;\nfunction getPrice(base) {\n  return base + base * tax; // Depends on external state!\n}\n```\n### Pure function (predictable)\n```js\nfunction getPrice(base, taxRate) {\n  return base + base * taxRate; // Same input = same output\n}\n```\nPure functions are the foundation of reliable, testable code.", category: 'Software Engineering', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_29', title: 'Type Your Code: Avoid Runtime Surprises', content: 'TypeScript catches entire categories of bugs at compile time — null errors, wrong argument types, missing properties — before your code ever runs.', tutorial: "### JavaScript: bug at runtime\n```js\nfunction add(a, b) { return a + b; }\nadd('5', 3); // Returns '53' not 8 — silent bug!\n```\n### TypeScript: bug at compile time\n```ts\nfunction add(a: number, b: number): number {\n  return a + b;\n}\nadd('5', 3);\n// Error: Argument of type 'string' is not assignable to 'number'\n```\nThe compiler is your first line of testing.", category: 'Best Practices', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_30', title: 'Pagination Over Fetching All Records', content: "Never fetch all rows from a table. Use LIMIT/OFFSET or cursor-based pagination to return only what the user can see.", tutorial: "### Never do this at scale\n```js\nconst allUsers = await supabase.from('users').select('*');\n// Could be millions of rows!\n```\n### Use pagination\n```js\nconst { data } = await supabase\n  .from('users')\n  .select('id, name, email')\n  .order('created_at', { ascending: false })\n  .range(page * 20, (page + 1) * 20 - 1);\n```\nFetch 20 records at a time. Load more on demand.", category: 'Database', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
    { id: 'st_31', title: 'Dependency Injection: Decouple Your Code', content: 'Pass dependencies as parameters instead of hardcoding them inside functions. This makes code testable and flexible.', tutorial: "### Tightly coupled (hard to test)\n```js\nfunction sendEmail(to, msg) {\n  const mailer = new ProductionMailer(); // Hardcoded!\n  mailer.send(to, msg);\n}\n```\n### Dependency injection (easy to test)\n```js\nfunction sendEmail(to, msg, mailer) {\n  mailer.send(to, msg);\n}\n// In tests:\nsendEmail('a@b.com', 'hello', new MockMailer());\n// In production:\nsendEmail('a@b.com', 'hello', new ProductionMailer());\n```", category: 'Architecture', author: 'Alishba Iqbal', fetched_at: new Date().toISOString() },
];

export const getCodingTips = async () => {
    try {
        const { data, error } = await supabase
            .from('coding_tips')
            .select('*')
            .order('fetched_at', { ascending: false });
        
        if (error || !data || data.length === 0) {
            // Return full curated library as fallback
            return STATIC_TIPS;
        }
        return data;
    } catch (err) {
        return STATIC_TIPS;
    }
};

export const getCertifications = async () => {
    try {
        const { data, error } = await supabase
            .from('certifications')
            .select('id, name, issuer, issue_date, image_url, credential_id, credential_url, details, accent_color, icon, location, order_index, created_at')
            .order('order_index', { ascending: true });
        
        if (error) {
            console.warn('Supabase certifications table query error (likely table does not exist):', error);
            return [];
        }
        return data || [];
    } catch (err) {
        console.warn('Failed to fetch certifications, defaulting to empty array:', err);
        return [];
    }
};
