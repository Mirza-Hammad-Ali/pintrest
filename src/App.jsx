import { useMemo, useState } from 'react'

const pins = [
  {
    id: 1,
    title: 'A quiet morning in the mountains',
    category: 'Travel',
    creator: 'Maya Chen',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85',
    alt: 'A peaceful alpine lake surrounded by mountains',
  },
  {
    id: 2,
    title: 'The coziest little reading corner',
    category: 'Home decor',
    creator: 'Olive & June',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85',
    alt: 'Warm, minimal living room with natural textures',
  },
  {
    id: 3,
    title: 'Slow Sunday breakfast',
    category: 'Food',
    creator: 'Nora Ellis',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=85',
    alt: 'A colorful table of fresh breakfast ingredients',
  },
  {
    id: 4,
    title: 'A little wildflower inspiration',
    category: 'Art',
    creator: 'Petal Studio',
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85',
    alt: 'Soft pink flowers in warm afternoon light',
  },
  {
    id: 5,
    title: 'Golden hour, somewhere by the sea',
    category: 'Travel',
    creator: 'The Sunday Edit',
    image:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=85',
    alt: 'Sunlit coastal scenery with a winding path',
  },
  {
    id: 6,
    title: 'Simple things, beautifully made',
    category: 'Style',
    creator: 'Studio Form',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85',
    alt: 'A thoughtfully styled collection of neutral clothing',
  },
  {
    id: 7,
    title: 'A home that feels like a deep breath',
    category: 'Home decor',
    creator: 'Nina Williams',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
    alt: 'A calm, sunlit living space filled with plants',
  },
  {
    id: 8,
    title: 'Fresh flavors for the week ahead',
    category: 'Food',
    creator: 'Good Gatherings',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
    alt: 'A fresh, vibrant salad in a ceramic bowl',
  },
  {
    id: 9,
    title: 'Postcards from the wild',
    category: 'Travel',
    creator: 'Ari in Motion',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85',
    alt: 'Dramatic mountain peaks beneath a cloudy sky',
  },
  {
    id: 10,
    title: 'Little details, big feeling',
    category: 'Style',
    creator: 'Lena Rose',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',
    alt: 'A stylish outfit in soft, muted colors',
  },
  {
    id: 11,
    title: 'Flowers for no special reason',
    category: 'Art',
    creator: 'Sunday Flowers',
    image:
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85',
    alt: 'A bouquet of colorful flowers in a glass vase',
  },
  {
    id: 12,
    title: 'A slow afternoon in the garden',
    category: 'Home decor',
    creator: 'At Home with Mae',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85',
    alt: 'Lush green plants in a sunny garden',
  },
]

const categories = ['For you', 'Design', 'Home decor', 'Travel', 'Food', 'Style', 'Art']

const iconPaths = {
  home: (
    <>
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
    </>
  ),
  bookmark: (
    <>
      <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-4-6 4z" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  chevron: (
    <>
      <path d="m7 10 5 5 5-5" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z" />
      <path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2z" />
    </>
  ),
  close: (
    <>
      <path d="m18 6-12 12M6 6l12 12" />
    </>
  ),
}

function Icon({ name, size = 22, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  )
}

function PinCard({ pin, saved, onSave }) {
  return (
    <article className="group mb-7 break-inside-avoid">
      <div className="relative overflow-hidden rounded-[22px] bg-stone-100">
        <img
          src={pin.image}
          alt={pin.alt}
          loading="lazy"
          className="block h-auto w-full transition duration-500 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
        <button
          type="button"
          onClick={() => onSave(pin.id)}
          aria-label={saved ? `Unsave ${pin.title}` : `Save ${pin.title}`}
          className={`absolute right-3 top-3 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 ${
            saved ? 'bg-neutral-900' : 'bg-[#e60023]'
          }`}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
        <button
          type="button"
          aria-label={`More options for ${pin.title}`}
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-neutral-800 opacity-0 shadow transition hover:bg-white group-hover:opacity-100"
        >
          <Icon name="more" size={19} />
        </button>
      </div>
      <div className="flex items-start gap-3 px-1 pt-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-[14px] font-semibold leading-5 text-neutral-800">
            {pin.title}
          </h2>
          <p className="mt-1 text-xs text-neutral-500">{pin.creator}</p>
        </div>
        <button
          type="button"
          onClick={() => onSave(pin.id)}
          aria-label={saved ? 'Remove from saved pins' : 'Save pin'}
          className={`mt-0.5 rounded-full p-1.5 transition hover:bg-neutral-100 ${
            saved ? 'text-[#e60023]' : 'text-neutral-500'
          }`}
        >
          <Icon name="bookmark" size={19} />
        </button>
      </div>
    </article>
  )
}

function App() {
  const [activeNav, setActiveNav] = useState('Home')
  const [activeCategory, setActiveCategory] = useState('For you')
  const [search, setSearch] = useState('')
  const [savedPins, setSavedPins] = useState([])
  const [notice, setNotice] = useState('')

  const visiblePins = useMemo(() => {
    const query = search.trim().toLowerCase()
    return pins.filter((pin) => {
      const matchesQuery =
        !query ||
        `${pin.title} ${pin.category} ${pin.creator}`.toLowerCase().includes(query)
      const matchesCategory =
        activeCategory === 'For you' ||
        activeCategory === 'Design' ||
        pin.category === activeCategory
      const matchesSaved = activeNav !== 'Saved' || savedPins.includes(pin.id)
      return matchesQuery && matchesCategory && matchesSaved
    })
  }, [activeCategory, activeNav, savedPins, search])

  function toggleSaved(id) {
    const isSaved = savedPins.includes(id)
    setSavedPins((current) =>
      isSaved ? current.filter((pinId) => pinId !== id) : [...current, id],
    )
    setNotice(isSaved ? 'Removed from your saved Pins' : 'Saved to your Pins')
    window.setTimeout(() => setNotice(''), 2200)
  }

  function showNotice(message) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2200)
  }

  const navigation = [
    { label: 'Home', icon: 'home' },
    { label: 'Explore', icon: 'sparkles' },
    { label: 'Messages', icon: 'chat' },
    { label: 'Saved', icon: 'bookmark' },
  ]

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[76px] flex-col items-center border-r border-neutral-100 bg-white py-5 md:flex">
        <button
          type="button"
          onClick={() => {
            setActiveNav('Home')
            setActiveCategory('For you')
          }}
          aria-label="Pinterest home"
          className="mb-8 grid h-11 w-11 place-items-center rounded-full text-[#e60023] transition hover:bg-red-50"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
            <circle cx="12" cy="12" r="11.5" fill="currentColor" />
            <path
              d="M12.7 4.5c-4.1 0-6.3 2.9-6.3 5.9 0 1.4.5 2.7 1.7 3.2.2.1.4 0 .5-.2l.2-.9c.1-.3.1-.4-.1-.7-.4-.5-.6-1.1-.6-2.1 0-2.7 2-5.1 5.2-5.1 2.8 0 4.3 1.7 4.3 4 0 3-1.3 5.5-3.2 5.5-1.1 0-1.9-.9-1.6-2l.7-2.8c.4-1.5.1-2.7-1.2-2.7-1 0-1.8 1-1.8 2.4 0 .9.3 1.5.3 1.5l-1.2 5c-.4 1.8-.1 4 .1 4.2.1.1.2.1.3 0 .2-.3 1.2-1.6 1.6-3.3l.6-2.3c.3.7 1.3 1.3 2.3 1.3 3 0 5-2.7 5-6.4.1-2.8-2.3-5.5-6.8-5.5z"
              fill="white"
            />
          </svg>
        </button>
        <nav aria-label="Main navigation" className="flex flex-1 flex-col items-center gap-3">
          {navigation.map((item) => (
            <button
              type="button"
              key={item.label}
              onClick={() => {
                setActiveNav(item.label)
                if (item.label === 'Home' || item.label === 'Explore') {
                  setActiveCategory('For you')
                  setSearch('')
                }
              }}
              aria-label={item.label}
              title={item.label}
              className={`grid h-12 w-12 place-items-center rounded-full transition ${
                activeNav === item.label
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Icon name={item.icon} size={23} />
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => showNotice('Settings are coming soon')}
          aria-label="Settings"
          className="mb-4 grid h-11 w-11 place-items-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
        >
          <span className="text-lg">•••</span>
        </button>
        <button
          type="button"
          onClick={() => showNotice('Your profile')}
          aria-label="Your profile"
          className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-white"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
        </button>
      </aside>

      <div className="md:pl-[76px]">
        <header className="sticky top-0 z-20 flex h-[76px] items-center gap-4 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => showNotice('Choose a board to organize your Pins')}
            className="hidden shrink-0 items-center gap-1 rounded-full px-3 py-3 text-sm font-semibold hover:bg-neutral-100 sm:flex"
          >
            Create <Icon name="chevron" size={16} />
          </button>
          <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full bg-[#f1f2f2] px-4 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-neutral-300">
            <Icon name="search" size={21} className="shrink-0 text-neutral-700" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for anything"
              aria-label="Search Pins"
              className="h-full w-full bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-500"
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearch('')}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full hover:bg-neutral-200"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </label>
          <button
            type="button"
            onClick={() => showNotice('You’re all caught up!')}
            aria-label="Notifications"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
          >
            <Icon name="bell" size={22} />
          </button>
          <button
            type="button"
            onClick={() => showNotice('Your messages')}
            aria-label="Messages"
            className="hidden h-11 w-11 shrink-0 place-items-center rounded-full text-neutral-700 transition hover:bg-neutral-100 sm:grid"
          >
            <Icon name="chat" size={22} />
          </button>
          <button
            type="button"
            onClick={() => showNotice('Your profile')}
            aria-label="Your profile"
            className="h-9 w-9 shrink-0 overflow-hidden rounded-full md:hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
              alt=""
              className="h-full w-full object-cover"
            />
          </button>
        </header>

        <main className="mx-auto max-w-[1700px] px-4 pb-12 sm:px-6 lg:px-10">
          <section className="mx-auto max-w-5xl pb-5 pt-4 text-center">
            <p className="mb-2 text-sm font-medium text-neutral-500">
              {activeNav === 'Saved' ? 'Your collection' : 'Tuesday, October 13'}
            </p>
            <h1 className="text-[26px] font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {activeNav === 'Saved'
                ? 'Pins you saved'
                : activeNav === 'Explore'
                  ? 'Find your next big idea'
                  : 'Good afternoon, Alex'}
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              {activeNav === 'Saved'
                ? 'All your inspiration, in one place.'
                : 'A little inspiration for whatever you’re dreaming up.'}
            </p>
          </section>

          {activeNav !== 'Saved' && (
            <nav
              aria-label="Explore categories"
              className="scrollbar-hide mb-7 flex items-center justify-start gap-2 overflow-x-auto pb-2 md:justify-center"
            >
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    activeCategory === category
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
          )}

          {visiblePins.length > 0 ? (
            <section
              aria-label={activeNav === 'Saved' ? 'Saved Pins' : 'Idea Pins'}
              className="columns-2 gap-x-4 sm:columns-3 sm:gap-x-5 lg:columns-4 xl:columns-5"
            >
              {visiblePins.map((pin) => (
                <PinCard
                  key={pin.id}
                  pin={pin}
                  saved={savedPins.includes(pin.id)}
                  onSave={toggleSaved}
                />
              ))}
            </section>
          ) : (
            <div className="mx-auto flex min-h-64 max-w-md flex-col items-center justify-center text-center">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-neutral-100 text-neutral-500">
                <Icon name={activeNav === 'Saved' ? 'bookmark' : 'search'} size={25} />
              </div>
              <h2 className="text-lg font-semibold">
                {activeNav === 'Saved' ? 'No saved Pins yet' : 'No ideas found'}
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                {activeNav === 'Saved'
                  ? 'When you find something you love, save it here.'
                  : 'Try another search or explore a different category.'}
              </p>
              {activeNav === 'Saved' && (
                <button
                  type="button"
                  onClick={() => setActiveNav('Home')}
                  className="mt-5 rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-700"
                >
                  Find inspiration
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {notice && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-lg"
        >
          {notice}
        </div>
      )}
    </div>
  )
}

export default App
