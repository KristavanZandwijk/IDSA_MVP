import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";

const CatalogOverview = () => {
  const theme = useTheme();
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await fetch("/api/catalogs");
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        const catalogsArray = data._embedded?.catalogs || [];
        setCatalogs(catalogsArray);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogs();
  }, []);

  const extractId = (url) => url?.split("/").pop() || "N/A";

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color={theme.palette.secondary.main} mt={2}>
        {error}
      </Typography>
    );

  if (catalogs.length === 0)
    return <Typography mt={2}>No catalogs found.</Typography>;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="flex-start"
      gap={3}
      mt={2}
    >
      {catalogs.map((catalog, index) => {
        const catalogId = extractId(catalog._links?.self?.href);
        const offerTemplate =
          catalog._links?.offers?.href?.replace("{?page,size}", "") || "N/A";

        return (
          <Box
            key={catalog._links?.self?.href || index}
            sx={{
              flex: "1 1 calc(33.33% - 16px)",
              minWidth: 280,
              maxWidth: "100%",
            }}
          >
            <Card
              sx={{
                minHeight: 250,
                borderRadius: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                backgroundColor: theme.palette.background.alt,
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0px 8px 20px ${theme.palette.primary[800]}`,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color={theme.palette.secondary[100]}
                  gutterBottom
                >
                  {catalog.title || `Catalog #${index + 1}`}
                </Typography>

                <Typography
                  variant="h6"
                  color={theme.palette.secondary.main}
                  gutterBottom
                >
                  {catalog.description || "No description provided."}
                </Typography>

                <Box mt={1}>
                  <Typography variant="body2" color={theme.palette.neutral[100]}>
                    <strong>Catalog ID:</strong> {catalogId}
                  </Typography>
                  <Typography variant="body2" color={theme.palette.neutral[100]}>
                    <strong>Offer ID template:</strong> {offerTemplate}
                  </Typography>
                  <Typography variant="body2" color={theme.palette.neutral[100]}>
                    <strong>Created:</strong>{" "}
                    {catalog.creationDate
                      ? new Date(catalog.creationDate).toLocaleString()
                      : "N/A"}
                  </Typography>
                  <Typography variant="body2" color={theme.palette.neutral[100]}>
                    <strong>Modified:</strong>{" "}
                    {catalog.modificationDate
                      ? new Date(catalog.modificationDate).toLocaleString()
                      : "N/A"}
                  </Typography>
                </Box>

                {catalog._links?.self?.href && (
                  <Typography mt={2}>
                    <a
                      href={catalog._links.self.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: theme.palette.secondary.main,
                        textDecoration: "none",
                      }}
                    >
                      Open Catalog URL
                    </a>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
};

export default CatalogOverview;
