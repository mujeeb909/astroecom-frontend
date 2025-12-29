import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Search, Tag, LogOut, Plus } from 'lucide-react';
import { logout } from '../../features/user/userSlice';

const TAGS = [
  'Delivery no made',
  'product damaged',
  'shipping issue',
  'wrong product',
  'Product info',
];

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState(['Delivery no made']);
  const [showTags, setShowTags] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowTags(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="px-6 pt-2 pb-2">
      <div className="bg-[#1a1d29] px-6 py-3 flex items-center justify-between rounded-2xl shadow-xl">

        {/* Logo */}
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <span className="text-white font-bold">M</span>
        </div>

        {/* Search */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            {/* Tag icon */}
            <button
              type="button"
              onClick={() => setShowTags((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <Tag className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-11 py-2.5 bg-[#2a2d3a] text-white placeholder-gray-400 rounded-lg text-sm focus:outline-none"
            />

            {/* Tag Dropdown */}
            {showTags && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-14 w-72 bg-white rounded-xl shadow-2xl p-3 z-50"
              >
                {/* Search tag */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tag"
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  {TAGS.filter((tag) =>
                    tag.toLowerCase().includes(tagSearch.toLowerCase())
                  ).map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="accent-primary"
                      />
                      {tag}
                    </label>
                  ))}
                </div>

                {/* Add new tag */}
                <button className="mt-4 w-full flex items-center justify-center gap-2 border rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Plus className="w-4 h-4" />
                  Add new tag
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Header;
