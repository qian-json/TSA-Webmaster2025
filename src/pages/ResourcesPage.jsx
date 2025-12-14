import {
  useContext,
  useState,
  useMemo,
  useCallback,
  memo,
  useRef,
  useEffect,
} from "react";
import styled from "styled-components";
import {ResourcesContext} from "../contexts/ResourcesContext.jsx";
import PageContainer from "../components/ui/PageContainer.jsx";

const PageLayout = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 7.3rem;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.2rem;
  color: #333;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.95rem;
  color: #333;
  gap: 0.6rem;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  margin-bottom: calc(100vh - 6.1rem - 10rem);

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ResourceCard = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  position: relative;
  background-color: transparent;
  transition: transform 0.3s;
  cursor: pointer;
  overflow: visible;
  z-index: 1;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background-color: rgba(255, 255, 255, 0.95);
    z-index: 100;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const ResourceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContainer = styled.div`
  padding: 1.2rem;
  position: relative;
`;

const ResourceName = styled.h3`
  color: #333;
  font-size: 1.25rem;
`;

const ResourceDescription = styled.p`
  color: #666;
  line-height: 1.2;
  font-size: 0.95rem;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: box-shadow 0.3s ease;
  /* z-index: 100; */
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 0 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0;

  ${ResourceCard}:hover & {
    max-height: 200px;
    opacity: 1;
    /* margin-top: 12px; */
    /* padding-top: 1.2rem; */
    padding-bottom: 1.2rem;
  }
`;

const ResourceCardComponent = memo(({resource}) => {
  return (
    <ResourceCard
      href={resource?.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ImageContainer>
        <ResourceImage
          src={resource.imageUrl}
          alt={resource.name}
          loading="lazy"
          decoding="async"
        />
      </ImageContainer>
      <TextContainer>
        <ResourceName>{resource.name}</ResourceName>
        <ResourceDescription>{resource.description}</ResourceDescription>
      </TextContainer>
    </ResourceCard>
  );
});

ResourceCardComponent.displayName = "ResourceCardComponent";

export default function ResourcesPage() {
  const resources = useContext(ResourcesContext);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    resources.forEach(resource => {
      if (resource.tags) {
        resource.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [resources]);

  const filteredResources = useMemo(() => {
    let filtered = resources;

    if (debouncedSearchQuery.trim() !== "") {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(resource => {
        const nameMatch = resource.name?.toLowerCase().includes(query);
        const descriptionMatch = resource.description
          ?.toLowerCase()
          .includes(query);
        return nameMatch || descriptionMatch;
      });
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(resource => {
        if (!resource.tags) return false;
        return selectedTags.some(tag => resource.tags.includes(tag));
      });
    }

    return filtered;
  }, [resources, selectedTags, debouncedSearchQuery]);

  const handleTagToggle = useCallback(tag => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  }, []);

  return (
    <PageContainer>
      <MainContent>
        <PageLayout>
          <Sidebar>
            <SearchInput
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <SidebarTitle>Filter by Tags</SidebarTitle>
            {allTags.map(tag => (
              <CheckboxContainer key={tag}>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                  />
                  <span>{tag}</span>
                </CheckboxLabel>
              </CheckboxContainer>
            ))}
          </Sidebar>
          <GridContainer>
            {filteredResources.map(resource => (
              <ResourceCardComponent key={resource.id} resource={resource} />
            ))}
          </GridContainer>
        </PageLayout>
      </MainContent>
    </PageContainer>
  );
}
