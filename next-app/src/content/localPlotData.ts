  // Define superpopulations and their corresponding colors
export const superPopulations: string[] = ["AFR", "EUR", "EAS", "SAS", "AMR"];

export const superPopulationColorsDict = {
    AFR: "#f25c5c",
    AMR: "#dab862",
    EAS: "#70c265",
    EUR: "#5480f0",
    SAS: "#999999",
    ALL: "#000000"
  };

  // Define populations and their corresponding color
export const subPopulations: string[] = [
    "ACB",
    "ASW",
    "ESN",
    "GWD",
    "LWK",
    "MSL",
    "YRI",
    "FIN",
    "GBR",
    "IBS",
    "TSI",
    "CDX",
    "CHB",
    "CHS",
    "JPT",
    "KHV",
    "BEB",
    "GIH",
    "ITU",
    "PJL",
    "STU",
    "CLM",
    "MXL",
    "PEL",
    "PUR",
    "ALL"
  ];

export const populationSubsets = [
    {
      "population": "ACB",
      "superpopulation": "AFR"
    },
    {
      "population": "ASW",
      "superpopulation": "AFR"
    },
    {
      "population": "BEB",
      "superpopulation": "SAS"
    },
    {
      "population": "PJL",
      "superpopulation": "SAS"
    },
    {
      "population": "STU",
      "superpopulation": "SAS"
    },
    {
      "population": "ITU",
      "superpopulation": "SAS"
    },
    {
      "population": "GIH",
      "superpopulation": "SAS"
    },
    {
      "population": "CDX",
      "superpopulation": "EAS"
    },
    {
      "population": "CHS",
      "superpopulation": "EAS"
    },
    {
      "population": "KHV",
      "superpopulation": "EAS"
    },
    {
      "population": "CHB",
      "superpopulation": "EAS"
    },
    {
      "population": "JPT",
      "superpopulation": "EAS"
    },
    {
      "population": "CLM",
      "superpopulation": "AMR"
    },
    {
      "population": "ESN",
      "superpopulation": "AFR"
    },
    {
      "population": "GWD",
      "superpopulation": "AFR"
    },
    {
      "population": "MSL",
      "superpopulation": "AFR"
    },
    {
      "population": "YRI",
      "superpopulation": "AFR"
    },
    {
      "population": "FIN",
      "superpopulation": "EUR"
    },
    {
      "population": "GBR",
      "superpopulation": "EUR"
    },
    {
      "population": "IBS",
      "superpopulation": "EUR"
    },
    {
      "population": "LWK",
      "superpopulation": "AFR"
    },
    {
      "population": "TSI",
      "superpopulation": "EUR"
    },
    {
      "population": "MXL",
      "superpopulation": "AMR"
    },
    {
      "population": "PEL",
      "superpopulation": "AMR"
    },
    {
      "population": "PUR",
      "superpopulation": "AMR"
    },
    {
      "population": "ALL",
      "superpopulation": "ALL" 
    }
  ]

export const sampleAlleleDataGenomicPlot = {
    'IGHV1-2*02': 
    {
      'superpopulation':
      [
        {
          "frequency": 0.69068,
          "n": 489,
          "population": "AFR"
        },
        {
          "frequency": 0.54831,
          "n": 227,
          "population": "EUR"
        },
        {
          "frequency": 0.40741,
          "n": 220,
          "population": "EAS"
        },
        {
          "frequency": 0.39963,
          "n": 217,
          "population": "SAS"
        },
        {
          "frequency": 0.58719,
          "n": 165,
          "population": "AMR"
        },
        {
          "frequency": 0.53017,
          "n": 1318,
          "population": "ALL"
        }
      ],
      'population':
      [
        {
          "frequency": 0.72152,
          "n": 57,
          "population": "ACB"
        },
        {
          "frequency": 0.72581,
          "n": 45,
          "population": "ASW"
        },
        {
          "frequency": 0.76106,
          "n": 86,
          "population": "ESN"
        },
        {
          "frequency": 0.61345,
          "n": 73,
          "population": "GWD"
        },
        {
          "frequency": 0.66387,
          "n": 79,
          "population": "LWK"
        },
        {
          "frequency": 0.59184,
          "n": 58,
          "population": "MSL"
        },
        {
          "frequency": 0.77119,
          "n": 91,
          "population": "YRI"
        },
        {
          "frequency": 0.56,
          "n": 56,
          "population": "FIN"
        },
        {
          "frequency": 0.57426,
          "n": 58,
          "population": "GBR"
        },
        {
          "frequency": 0.54545,
          "n": 54,
          "population": "IBS"
        },
        {
          "frequency": 0.51754,
          "n": 59,
          "population": "TSI"
        },
        {
          "frequency": 0.392,
          "n": 49,
          "population": "CDX"
        },
        {
          "frequency": 0.39091,
          "n": 43,
          "population": "CHB"
        },
        {
          "frequency": 0.41,
          "n": 41,
          "population": "CHS"
        },
        {
          "frequency": 0.39048,
          "n": 41,
          "population": "JPT"
        },
        {
          "frequency": 0.46,
          "n": 46,
          "population": "KHV"
        },
        {
          "frequency": 0.53398,
          "n": 55,
          "population": "BEB"
        },
        {
          "frequency": 0.36697,
          "n": 40,
          "population": "GIH"
        },
        {
          "frequency": 0.33929,
          "n": 38,
          "population": "ITU"
        },
        {
          "frequency": 0.41667,
          "n": 45,
          "population": "PJL"
        },
        {
          "frequency": 0.35135,
          "n": 39,
          "population": "STU"
        },
        {
          "frequency": 0.55714,
          "n": 39,
          "population": "CLM"
        },
        {
          "frequency": 0.52113,
          "n": 37,
          "population": "MXL"
        },
        {
          "frequency": 0.64286,
          "n": 45,
          "population": "PEL"
        },
        {
          "frequency": 0.62857,
          "n": 44,
          "population": "PUR"
        },
        {
          "frequency": 0.53017,
          "n": 1318,
          "population": "ALL"
        }
      ],
      'SNPscore': "0.0",
      'SNPsnips': [
        "(:0,106452669)"
      ],
    },
  }

export const sampleAlleleDataAminoAcidPlot = {
    'IGHV1-2*02': 
    {
      'superpopulation':
      [
        {
          "frequency": 0.71186,
          "n": 504,
          "population": "AFR"
        },
        {
          "frequency": 0.54831,
          "n": 227,
          "population": "EUR"
        },
        {
          "frequency": 0.40741,
          "n": 220,
          "population": "EAS"
        },
        {
          "frequency": 0.39963,
          "n": 217,
          "population": "SAS"
        },
        {
          "frequency": 0.58719,
          "n": 165,
          "population": "AMR"
        },
        {
          "frequency": 0.5362,
          "n": 1333,
          "population": "ALL"
        }
      ],
      'population':
      [
        {
          "frequency": 0.78481,
          "n": 62,
          "population": "ACB"
        },
        {
          "frequency": 0.74194,
          "n": 46,
          "population": "ASW"
        },
        {
          "frequency": 0.78761,
          "n": 89,
          "population": "ESN"
        },
        {
          "frequency": 0.61345,
          "n": 73,
          "population": "GWD"
        },
        {
          "frequency": 0.67227,
          "n": 80,
          "population": "LWK"
        },
        {
          "frequency": 0.60204,
          "n": 59,
          "population": "MSL"
        },
        {
          "frequency": 0.80508,
          "n": 95,
          "population": "YRI"
        },
        {
          "frequency": 0.56,
          "n": 56,
          "population": "FIN"
        },
        {
          "frequency": 0.57426,
          "n": 58,
          "population": "GBR"
        },
        {
          "frequency": 0.54545,
          "n": 54,
          "population": "IBS"
        },
        {
          "frequency": 0.51754,
          "n": 59,
          "population": "TSI"
        },
        {
          "frequency": 0.392,
          "n": 49,
          "population": "CDX"
        },
        {
          "frequency": 0.39091,
          "n": 43,
          "population": "CHB"
        },
        {
          "frequency": 0.41,
          "n": 41,
          "population": "CHS"
        },
        {
          "frequency": 0.39048,
          "n": 41,
          "population": "JPT"
        },
        {
          "frequency": 0.46,
          "n": 46,
          "population": "KHV"
        },
        {
          "frequency": 0.53398,
          "n": 55,
          "population": "BEB"
        },
        {
          "frequency": 0.36697,
          "n": 40,
          "population": "GIH"
        },
        {
          "frequency": 0.33929,
          "n": 38,
          "population": "ITU"
        },
        {
          "frequency": 0.41667,
          "n": 45,
          "population": "PJL"
        },
        {
          "frequency": 0.35135,
          "n": 39,
          "population": "STU"
        },
        {
          "frequency": 0.55714,
          "n": 39,
          "population": "CLM"
        },
        {
          "frequency": 0.52113,
          "n": 37,
          "population": "MXL"
        },
        {
          "frequency": 0.64286,
          "n": 45,
          "population": "PEL"
        },
        {
          "frequency": 0.62857,
          "n": 44,
          "population": "PUR"
        },
        {
          "frequency": 0.5362,
          "n": 1333,
          "population": "ALL"
        }
      ],
      'alleleListAA': [
        "IGHV1-2*02",
        "IGHV1-2*02_S4953"
      ],
    },
  }

export const sampleMSAData = [
	{
		"allele": "IGHV1-18*01",
		"sequence_aa": "QVQLVQSGAEVKKPGASVKVSCKASGYTFTSYGISWVRQAPGQGLEWMGWISAYNGNTNYAQKLQGRVTMTTDTSTSTAYMELRSLRSDDTAVYYCAR",
		"sequence_nt": "CAGGTTCAGCTGGTGCAGTCTGGAGCTGAGGTGAAGAAGCCTGGGGCCTCAGTGAAGGTCTCCTGCAAGGCTTCTGGTTACACCTTTACCAGCTATGGTATCAGCTGGGTGCGACAGGCCCCTGGACAAGGGCTTGAGTGGATGGGATGGATCAGCGCTTACAATGGTAACACAAACTATGCACAGAAGCTCCAGGGCAGAGTCACCATGACCACAGACACATCCACGAGCACAGCCTACATGGAGCTGAGGAGCCTGAGATCTGACGACACGGCCGTGTATTACTGTGCGAGAGA"
	},
	{
		"allele": "IGHV1-18*01_S0898",
		"sequence_aa": "QVQLVQSGAEVKKPGASVKVSCKASGYTFTSYGISWVRQAPGQGLEWMGWISAYNGNTNYAQKLQGRVTMTTDTSTSTAYMELRSLRSDDTAVYYCAR",
		"sequence_nt": "CAGGTGCAGCTGGTGCAGTCTGGAGCTGAGGTGAAGAAGCCTGGGGCCTCAGTGAAGGTCTCCTGCAAGGCTTCTGGTTACACCTTTACCAGCTATGGTATCAGCTGGGTGCGACAGGCCCCTGGACAAGGGCTTGAGTGGATGGGATGGATCAGCGCTTACAATGGTAACACAAACTATGCACAGAAGCTCCAGGGCAGAGTCACCATGACCACAGACACATCCACGAGCACAGCCTACATGGAGCTGAGGAGCCTGAGATCTGACGACACGGCCGTGTATTACTGTGCGAGAGA"
	},
	{
		"allele": "IGHV1-18*01_S1946",
		"sequence_aa": "QVQLVQSGAEVKKPGASVKVSCKASGYTFTSYGISWVRQAPGQGLEWMGWISAYNGNTNYAQKLQGRVTMTTDTSTSTAYMELRSLRSDDTAVYYCAR",
		"sequence_nt": "CAGGTCCAGCTGGTGCAGTCTGGAGCTGAGGTGAAGAAGCCTGGGGCCTCAGTGAAGGTCTCCTGCAAGGCTTCTGGTTACACCTTTACCAGCTATGGTATCAGCTGGGTGCGACAGGCCCCTGGACAAGGGCTTGAGTGGATGGGATGGATCAGCGCTTACAATGGTAACACAAACTATGCACAGAAGCTCCAGGGCAGAGTCACCATGACCACAGACACATCCACGAGCACAGCCTACATGGAGCTGAGGAGCCTGAGATCTGACGACACGGCCGTGTATTACTGTGCGAGAGA"
	},
	{
		"allele": "IGHV1-18*01_S2590",
		"sequence_aa": "QVQLVQSGAEVKKPGASVKVSCKASGYTFTSYGISWVRQAPGQGLEWMGWISAYNGNTNYAQKLQDRVTMTTDTSTSTAYMELRSLRSDDTAVYYCAR",
		"sequence_nt": "CAGGTTCAGCTGGTGCAGTCTGGAGCTGAGGTGAAGAAGCCTGGGGCCTCAGTGAAGGTCTCCTGCAAGGCTTCTGGTTACACCTTTACCAGCTATGGTATCAGCTGGGTGCGACAGGCCCCTGGACAAGGGCTTGAGTGGATGGGATGGATCAGCGCTTACAATGGTAACACAAACTATGCACAGAAGCTCCAGGACAGAGTCACCATGACCACAGACACATCCACGAGCACAGCCTACATGGAGCTGAGGAGCCTGAGATCTGACGACACGGCCGTGTATTACTGTGCGAGAGA"
	},
	{
		"allele": "IGHV1-18*01_S4206",
		"sequence_aa": "QVQLVQSGAEVKKPGASVKVSCKASGYTFTSYGISWVRQAPGQGLEWMGWISAYNGDTNYAQKLQGRVTMTTDTSTSTAYMELRSLRSDDTAVYYCAR",
		"sequence_nt": "CAGGTTCAGCTGGTGCAGTCTGGAGCTGAGGTGAAGAAGCCTGGGGCCTCAGTGAAGGTCTCCTGCAAGGCTTCTGGTTACACCTTTACCAGCTATGGTATCAGCTGGGTGCGACAGGCCCCTGGACAAGGGCTTGAGTGGATGGGATGGATCAGCGCTTACAATGGTGACACAAACTATGCACAGAAGCTCCAGGGCAGAGTCACCATGACCACAGACACATCCACGAGCACAGCCTACATGGAGCTGAGGAGCCTGAGATCTGACGACACGGCCGTGTATTACTGTGCGAGAGA"
	},
	{
		"allele": "IGHV1-18*01_S8907",
		"sequence_aa": "QVQLVQSGAEVKKPGASVKVSCKASGYTFTSYGISWVRQAPGQGLEWMGWISAYNGNTNYAQKLQGRVTMTTDTSTSTAYMELRRLRSDDTAVYYCAR",
		"sequence_nt": "CAGGTTCAGCTGGTGCAGTCTGGAGCTGAGGTGAAGAAGCCTGGGGCCTCAGTGAAGGTCTCCTGCAAGGCTTCTGGTTACACCTTTACCAGCTATGGTATCAGCTGGGTGCGACAGGCCCCTGGACAAGGGCTTGAGTGGATGGGATGGATCAGCGCTTACAATGGTAACACAAACTATGCACAGAAGCTCCAGGGCAGAGTCACCATGACCACAGACACATCCACGAGCACAGCCTACATGGAGCTGAGGAGGCTGAGATCTGACGACACGGCCGTGTATTACTGTGCGAGAGA"
	},
	{
		"allele": "IGHV1-18*03",
		"sequence_aa": "QVQLVQSGAEVKKPGASVKVSCKASGYTFTSYGISWVRQAPGQGLEWMGWISAYNGNTNYAQKLQGRVTMTTDTSTSTAYMELRSLRSDDMAVYYCAR",
		"sequence_nt": "CAGGTTCAGCTGGTGCAGTCTGGAGCTGAGGTGAAGAAGCCTGGGGCCTCAGTGAAGGTCTCCTGCAAGGCTTCTGGTTACACCTTTACCAGCTATGGTATCAGCTGGGTGCGACAGGCCCCTGGACAAGGGCTTGAGTGGATGGGATGGATCAGCGCTTACAATGGTAACACAAACTATGCACAGAAGCTCCAGGGCAGAGTCACCATGACCACAGACACATCCACGAGCACAGCCTACATGGAGCTGAGGAGCCTGAGATCTGACGACATGGCCGTGTATTACTGTGCGAGAGA"
	},
	{
		"allele": "IGHV1-18*04",
		"sequence_aa": "QVQLVQSGAEVKKPGASVKVSCKASGYTFTSYGISWVRQAPGQGLEWMGWISAYNGNTNYAQKLQGRVTMTTDTSTSTAYMELRSLRSDDTAVYYCAR",
		"sequence_nt": "CAGGTTCAGCTGGTGCAGTCTGGAGCTGAGGTGAAGAAGCCTGGGGCCTCAGTGAAGGTCTCCTGCAAGGCTTCTGGTTACACCTTTACCAGCTACGGTATCAGCTGGGTGCGACAGGCCCCTGGACAAGGGCTTGAGTGGATGGGATGGATCAGCGCTTACAATGGTAACACAAACTATGCACAGAAGCTCCAGGGCAGAGTCACCATGACCACAGACACATCCACGAGCACAGCCTACATGGAGCTGAGGAGCCTGAGATCTGACGACACGGCCGTGTATTACTGTGCGAGAGA"
	},
  {
		"allele": "IGHV1-18*01_S7240",
		"sequence_aa": "-LQLVQSGAEVKKPGASVKVSCKASGYTFTSYGISWVRQAPGQGLEWMGWISAYNGNTNYAQKLQGRVTMTTDTSTSTAYMELRSLRSDDTAVYYCAR",
		"sequence_nt": "C---TGCAGCTGGTGCAGTCTGGAGCTGAGGTGAAGAAGCCTGGGGCCTCAGTGAAGGTCTCCTGCAAGGCTTCTGGTTACACCTTTACCAGCTATGGTATCAGCTGGGTGCGACAGGCCCCTGGACAAGGGCTTGAGTGGATGGGATGGATCAGCGCTTACAATGGTAACACAAACTATGCACAGAAGCTCCAGGGCAGAGTCACCATGACCACAGACACATCCACGAGCACAGCCTACATGGAGCTGAGGAGCCTGAGATCTGACGACACGGCCGTGTATTACTGTGCGAGAGA"
	},
]