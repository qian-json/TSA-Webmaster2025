import {useState, useEffect} from "react";
import styled from "styled-components";
import PageContainer from "../components/ui/PageContainer.jsx";
import Hero from "../components/ui/Hero.jsx";

const FORMSPREE_URL = "https://formspree.io/f/mykoakyj";

const FormCard = styled.section`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin: 2rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
`;

const Required = styled.span`
  color: #a83232;
  margin-left: 0.2rem;
`;

const Input = styled.input`
  padding: 0.7rem 0.85rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  background-color: #ffffff;

  &:focus {
    border-color: #1e3a8a;
  }
`;

const Select = styled.select`
  padding: 0.7rem 0.85rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  background-color: #ffffff;
  cursor: pointer;

  &:focus {
    border-color: #1e3a8a;
  }
`;

const Textarea = styled.textarea`
  padding: 0.7rem 0.85rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  background-color: #ffffff;
  min-height: 100px;
  resize: vertical;

  &:focus {
    border-color: #1e3a8a;
  }
`;

const SubmitButton = styled.button`
  background-color: #591506;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background-color: #3f0e04;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const Status = styled.div`
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  background-color: ${props =>
    props.$type === "error" ? "#fdecec" : "#e8f5e9"};
  color: ${props => (props.$type === "error" ? "#a83232" : "#2d6b3a")};
`;

const SuccessBlock = styled.div`
  text-align: center;
  padding: 2rem 0;

  h2 {
    font-size: 1.8rem;
    color: #2d6b3a;
    margin-bottom: 0.8rem;
  }

  p {
    color: #555;
    margin-bottom: 1.5rem;
  }
`;

const initialFormData = {
  resourceName: "",
  category: "",
  address: "",
  description: "",
  website: "",
  phone: "",
  hours: "",
  submitterName: "",
  submitterEmail: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    document.title = "Contribute | Katy Resource Hub";
  }, []);

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData(initialFormData);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  }

  return (
    <>
      <Hero
        title="Contribute"
        text="Help us grow the directory. Know a Katy resource we missed? Fill out the form below and we'll review it."
        image="/hero-contribute.jpg"
      />
      <PageContainer>
        <FormCard>
          {status === "sent" ? (
            <SuccessBlock>
              <h2>Thanks for contributing!</h2>
              <p>
                Your submission was received. We'll review it for the directory.
              </p>
              <SubmitButton onClick={() => setStatus("idle")}>
                Submit another
              </SubmitButton>
            </SuccessBlock>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FieldRow>
                <Field>
                  <Label htmlFor="resourceName">
                    Resource name<Required>*</Required>
                  </Label>
                  <Input
                    id="resourceName"
                    name="resourceName"
                    type="text"
                    required
                    value={formData.resourceName}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Label htmlFor="category">
                    Category<Required>*</Required>
                  </Label>
                  <Select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    <option value="Support Services">Support Services</option>
                    <option value="Recreation">Recreation</option>
                  </Select>
                </Field>
              </FieldRow>

              <Field>
                <Label htmlFor="address">
                  Address<Required>*</Required>
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  placeholder="Street, City, State ZIP"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label htmlFor="description">
                  Description<Required>*</Required>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="What does this resource offer?"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Field>

              <FieldRow>
                <Field>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Field>
              </FieldRow>

              <Field>
                <Label htmlFor="hours">Hours</Label>
                <Input
                  id="hours"
                  name="hours"
                  type="text"
                  placeholder="e.g. Mon-Fri 9am-5pm"
                  value={formData.hours}
                  onChange={handleChange}
                />
              </Field>

              <FieldRow>
                <Field>
                  <Label htmlFor="submitterName">Your name</Label>
                  <Input
                    id="submitterName"
                    name="submitterName"
                    type="text"
                    value={formData.submitterName}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Label htmlFor="submitterEmail">Your email</Label>
                  <Input
                    id="submitterEmail"
                    name="submitterEmail"
                    type="email"
                    value={formData.submitterEmail}
                    onChange={handleChange}
                  />
                </Field>
              </FieldRow>

              {status === "error" && (
                <Status $type="error">
                  Something went wrong. Please try again later.
                </Status>
              )}

              <SubmitButton type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Submit"}
              </SubmitButton>
            </Form>
          )}
        </FormCard>
      </PageContainer>
    </>
  );
}
