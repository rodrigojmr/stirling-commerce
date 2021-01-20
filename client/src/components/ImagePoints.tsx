import styled from '@emotion/styled';

const Wrapper = styled.div`
  position: relative;
  max-width: 60%;
`;

const StyledImage = styled.img`
  width: 100%;
`;

const ImagePoints = () => {
  return (
    <Wrapper>
      <StyledImage src="./images/products/shoes/running-shoes-2.webp" alt="" />
    </Wrapper>
  );
};

export default ImagePoints;
