import {useContext, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {ResourcesContext} from "../contexts/ResourcesContext.jsx";
import PageContainer from "../components/ui/PageContainer.jsx";
import Hero from "../components/ui/Hero.jsx";

const tagColors = {
  "support services": "#1e3a8a",
  "recreation": "#2d6b3a",
  "basic needs": "#3c7a4a",
  "housing assistance": "#2e5a8c",
  "family services": "#8b3a62",
  "crisis support": "#a83232",
  "employment & info": "#1f7a8c",
  "sports": "#c24a2c",
  "outdoor": "#1f5530",
  "dog-friendly": "#7a5430",
  "historic": "#8a7a3c",
};

function getCardColor(tags) {
  if (!tags || tags.length === 0) return "#888";
  return tagColors[tags[0]] || "#888";
}

const supportTagsList = [
  "basic needs",
  "housing assistance",
  "family services",
  "crisis support",
  "employment & info",
];

const recreationTagsList = [
  "sports",
  "outdoor",
  "dog-friendly",
  "historic",
];

const FilterBar = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.2rem;
`;

const FilterSearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.7rem 0.85rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: #ffffff;
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    border-color: #333;
  }
`;

const FilterSelect = styled.select`
  padding: 0.7rem 0.85rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: #ffffff;
  font-family: inherit;
  cursor: pointer;
  min-width: 200px;

  &:focus {
    border-color: #333;
  }
`;

const SelectedTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SelectedTagChip = styled.button`
  background-color: #591506;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background-color: #3f0e04;
  }
`;

const MainContent = styled.div`
  width: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ResourceCard = styled.article`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.14);
  }
`;

const ColorStripe = styled.div`
  height: 5px;
  background-color: ${props => props.$color};
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 160px;
  overflow: hidden;
`;

const ResourceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
`;

const ResourceName = styled.h3`
  color: #333;
  font-size: 1.15rem;
  font-weight: bold;
  line-height: 1.3;
`;

const NameLink = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ResourceDescription = styled.p`
  color: #555;
  font-size: 0.9rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const TagPill = styled.span`
  background-color: ${props => props.$color}22;
  color: ${props => props.$color};
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  text-transform: capitalize;
`;

const MapLink = styled(Link)`
  margin-top: auto;
  background-color: #591506;
  color: #ffffff;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #3f0e04;
  }
`;

function ResourceCardComponent({resource}) {
  const cardColor = getCardColor(resource.tags);
  return (
    <ResourceCard>
      <ColorStripe $color={cardColor} />
      {resource.imageUrl && (
        <ImageContainer>
          <ResourceImage
            src={resource.imageUrl}
            alt={resource.name}
          />
        </ImageContainer>
      )}
      <CardBody>
        <ResourceName>
          {resource.link && resource.link !== "#" ? (
            <NameLink
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resource.name}
            </NameLink>
          ) : (
            resource.name
          )}
        </ResourceName>
        <ResourceDescription>{resource.description}</ResourceDescription>
        {resource.tags && resource.tags.length > 0 && (
          <TagRow>
            {resource.tags
              .filter(tag => tag !== "support services" && tag !== "recreation")
              .map(tag => (
                <TagPill key={tag} $color={tagColors[tag] || "#888"}>
                  {tag}
                </TagPill>
              ))}
          </TagRow>
        )}
        <MapLink to={`/map?resource=${resource.id}#map`}>Show details</MapLink>
      </CardBody>
    </ResourceCard>
  );
}

export default function ResourcesPage() {
  const resources = useContext(ResourcesContext);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Catalog | Katy Resource Hub";
    console.log("loaded resources:", resources.length);
  }, [resources]);

  let filteredResources = resources;

  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filteredResources = filteredResources.filter(resource => {
      const nameMatch = resource.name.toLowerCase().includes(query);
      const descriptionMatch = resource.description.toLowerCase().includes(query);
      return nameMatch || descriptionMatch;
    });
  }

  if (selectedTags.length > 0) {
    filteredResources = filteredResources.filter(resource => {
      if (!resource.tags) return false;
      return selectedTags.some(tag => resource.tags.includes(tag));
    });
  }
  // console.log(filteredResources);

  return (
    <>
      <Hero
        title="Catalog"
        text="Browse community resources serving Katy and the surrounding area."
        image="/hero-catalog.jpg"
      />
      <PageContainer>
        <MainContent>
          <FilterBar>
            <FilterSearchInput
              type="text"
              placeholder="Search resources..."
              aria-label="Search resources"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <FilterSelect
              aria-label="Filter by tag"
              value=""
              onChange={e => {
                const tag = e.target.value;
                if (tag !== "" && !selectedTags.includes(tag)) {
                  setSelectedTags([...selectedTags, tag]);
                }
              }}
            >
              <option value="">All tags</option>
              <optgroup label="Support Services">
                {supportTagsList.map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Recreation">
                {recreationTagsList.map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </optgroup>
            </FilterSelect>
          </FilterBar>
          {selectedTags.length > 0 && (
            <SelectedTagRow>
              {selectedTags.map(tag => (
                <SelectedTagChip
                  key={tag}
                  onClick={() =>
                    setSelectedTags(selectedTags.filter(t => t !== tag))
                  }
                >
                  {tag} ×
                </SelectedTagChip>
              ))}
            </SelectedTagRow>
          )}
          <GridContainer>
            {filteredResources.map(resource => (
              <ResourceCardComponent key={resource.id} resource={resource} />
            ))}
          </GridContainer>
        </MainContent>
      </PageContainer>
    </>
  );
}
