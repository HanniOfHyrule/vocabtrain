import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { saveWord } from "./SupabaseClient";

interface TranslationsProps {
  data: string;
  onDelete: (value: string) => void;
}

const Translations = (props: TranslationsProps) => {
  return (
    <Box sx={{ padding: "2px" }}>
      <Chip label={props.data} onDelete={() => props.onDelete(props.data)} />
    </Box>
  );
};

export default function AddWordForm() {
  const [word, setWord] = useState<string>("");
  const [translations, setTranslations] = useState<string[]>([]);
  const wordRef = useRef<HTMLInputElement>();
  const translationsRef = useRef<HTMLInputElement>();

  const addTranslation = (value: string) => {
    setTranslations([...translations, value.replace(/,$/g, "")]);
    translationsRef.current!!.value = "";
  };

  const handleOnBlur = () => {
    if (translationsRef.current!!.value.length > 0) {
      addTranslation(translationsRef.current!!.value);
    }
  };

  const handleOnClickSave = () => {
    saveWord({
      word,
      translations,
      language: "en-de",
    }).then(() => {
      wordRef.current!!.value = "";
      translationsRef.current!!.value = "";
      setTranslations([]);

      // TODO: add snackbar
    });
  };

  const handleOnKeyUp = (e: React.KeyboardEvent) => {
    const value = translationsRef.current!!.value.trimEnd();

    if (e.key === "," || e.key === "Enter") {
      addTranslation(value);
    } else if (
      (e.key === "Backspace" || e.key === "Delete") &&
      value === "" &&
      translations.length > 0
    ) {
      const last = translations[translations.length - 1];

      handleDelete(last);
      translationsRef.current!!.value = last;
    }
  };

  const handleDelete = (value: string) => {
    setTranslations(translations.filter((val) => val !== value));
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: "1em" }}>
        What do you want to add?
      </Typography>
      <Stack>
        <TextField
          id="outlined-basic"
          label="Word"
          variant="outlined"
          fullWidth
          autoFocus
          inputRef={wordRef}
          onChange={(e: React.ChangeEvent) =>
            setWord((e.target as HTMLInputElement).value.trim())
          }
        />
        <Box sx={{ marginTop: "20px", flexGrow: 1 }}>
          <Typography variant="h6" sx={{ marginBottom: "1em" }}>
            Translations
          </Typography>
          <TextField
            id="outlined-basic"
            label="Translations"
            variant="outlined"
            helperText="Please enter one or more translations"
            fullWidth
            onKeyUp={handleOnKeyUp}
            onBlur={handleOnBlur}
            inputRef={translationsRef}
            InputProps={{
              startAdornment: (
                <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                  {translations.map((data, index) => {
                    return (
                      <Translations
                        onDelete={handleDelete}
                        data={data}
                        key={index}
                      />
                    );
                  })}
                </Box>
              ),
            }}
          />
        </Box>

        <Button variant="contained" onClick={handleOnClickSave}>
          Save
        </Button>
      </Stack>
    </div>
  );
}
